**Tags:** #GPU #Proxmox #LXC #AI #Homelab #Tutorials

This guide provides step-by-step instructions for setting up GPU passthrough for LXC containers in Proxmox.
## Host Node Setup

Perform these steps directly on your Proxmox host node's shell terminal.

### Update and Upgrade System Packages

```bash
apt update && apt upgrade -y && apt install pve-headers-$(uname -r) build-essential software-properties-common make nvtop htop -y
```

**Explanation:**

* `apt update`: Refreshes the package lists.
* `apt upgrade -y`: Upgrades all installed packages to their latest versions.
* `apt install ...`: Installs necessary packages:
    * `pve-headers-$(uname -r)`: Proxmox kernel headers matching your running kernel. Essential for DKMS (Dynamic Kernel Module Support).
    * `build-essential`:  Essential tools for compiling software.
    * `software-properties-common`:  Utilities for managing software repositories.
    * `make`:  Build automation tool.
    * `nvtop`: NVIDIA GPU monitoring utility (optional but helpful).
    * `htop`:  Improved process viewer (optional but helpful).

### Update Initramfs

```bash
update-initramfs -u
```

**Explanation:**

* `update-initramfs -u`: Updates the initramfs (initial RAM filesystem). This ensures the new kernel modules and configurations are loaded during boot.

### Download Debian LXC Template

Download a Debian template for LXC containers within the Proxmox web interface or using the `pveam download` command. This guide assumes you are using a Debian-based template.

## LXC Container Setup

### Create and Enter the LXC Container

1. **Create a new LXC container** through the Proxmox web interface. Choose a Debian-based template. Note the container ID (e.g., 105).
2. **Start the container.**
3. **Enter the container shell** either through the Proxmox web interface console or using `pct enter <container_ID>` (e.g., `pct enter 105`).

### Update the Container

Once inside the container shell, update the package lists:

```bash
apt update && apt upgrade -y
```

## GPU Driver Installation (Inside LXC Container)

### Find and Download NVIDIA Driver

1. **Identify your NVIDIA GPU model.**
2. **Go to the NVIDIA driver download page** [https://www.nvidia.com/Download/index.aspx](https://www.nvidia.com/Download/index.aspx)
3. **Search for and download the latest driver** for Linux 64-bit, choosing the `.run` file installer.
4. **Get the direct download URL** of the `.run` file.

### Download and Install Driver in Proxmox Host

Use `wget` to download the driver inside the Host Shell. Replace `HTTP://URLHERE` with the actual URL you obtained.

```bash
wget HTTP://URLHERE
```

Make the driver executable and run the installer with the `--dkms` flag:

```bash
chmod +x NVIDIA-Linux-x86_64-XXX.XX.XX.run  # Replace with your downloaded file name
./NVIDIA-Linux-x86_64-XXX.XX.XX.run --dkms
```

**During the installation:**

* **Answer "yes"** to install DKMS.
* **Follow the on-screen prompts** to complete the driver installation.

### Get cgroup Device IDs

After the driver installation completes, run the following command on the Proxmox **host node** (not inside the container):

```bash
ls -al /dev/nvidia*
```

This will output information about your NVIDIA device files.  **Note down the major device numbers (the first number before the comma) for:**

* `/dev/nvidia0` (or `/dev/nvidia<X>` for multiple GPUs) - Typically `195`
* `/dev/nvidiactl` - Typically `195`
* `/dev/nvidia-uvm` - Typically `509`
* `/dev/nvidia-uvm-tools` - Typically `509`
* `/dev/nvidia-caps/nvidia-cap1` - Typically `234`
* `/dev/nvidia-caps/nvidia-cap2` - Typically `234`

**Example Output (Your numbers may differ):**

```
root@prox1:~# ls -al /dev/nvidia*
crw-rw-rw- 1 root root 195,   0 Nov 13 01:23 /dev/nvidia0
crw-rw-rw- 1 root root 195, 255 Nov 13 01:23 /dev/nvidiactl
crw-rw-rw- 1 root root 509,   0 Nov 13 01:23 /dev/nvidia-uvm
crw-rw-rw- 1 root root 509,   1 Nov 13 01:23 /dev/nvidia-uvm-tools

/dev/nvidia-caps:
total 0
drwxr-xr-x 2 root root 80 Nov 13 01:23 .
drwxr-xr-x 22 root root 6360 Nov 13 01:23 ..
cr——– 1 root root 234, 1 Nov 13 01:23 nvidia-cap1
cr–r–r– 1 root root 234, 2 Nov 13 01:23 nvidia-cap2
```

## Configure LXC Container for GPU Passthrough

### Edit LXC Configuration File

On the Proxmox **host node**, edit the configuration file of your LXC container. Replace `105` with your container ID:

```bash
nano /etc/pve/lxc/105.conf
```

### Add cgroup and Mount Entries

Append the following lines to the configuration file. **Replace `195`, `234`, and `509` with the major device numbers you noted earlier.**

```
lxc.cgroup2.devices.allow: c 195:* rwm
lxc.cgroup2.devices.allow: c 234:* rwm
lxc.cgroup2.devices.allow: c 509:* rwm
lxc.mount.entry: /dev/nvidia0 dev/nvidia0 none bind,optional,create=file
lxc.mount.entry: /dev/nvidiactl dev/nvidiactl none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-modeset dev/nvidia-modeset none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-uvm dev/nvidia-uvm none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-uvm-tools dev/nvidia-uvm-tools none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-caps/nvidia-cap1 dev/nvidia-caps/nvidia-cap1 none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-caps/nvidia-cap2 dev/nvidia-caps/nvidia-cap2 none bind,optional,create=file
```

**If you have multiple GPUs**, add additional `lxc.mount.entry` lines for `/dev/nvidia1`, `/dev/nvidia2`, etc., incrementing the device number accordingly.

**Explanation:**

* `lxc.cgroup2.devices.allow`:  Allows the LXC container to access character devices (`c`) with the specified major device numbers (`195`, `234`, `509`) and any minor device number (`:*`). `rwm` grants read, write, and mknod permissions.
* `lxc.mount.entry`: Binds devices from the host node to the container.
    * `/dev/nvidia*`:  Mounts the NVIDIA device files.
    * `none bind,optional,create=file`:  Specifies a bind mount, makes it optional (container can start even if the device isn't present initially), and creates the device file if it doesn't exist in the container.

### Push Driver Installer to Container 

You can push the NVIDIA driver installer file into the container for easier installation. On the Proxmox **host node**:

```bash
pct push 105 NVIDIA-Linux-x86_64-XXX.XX.XX.run /root/NVIDIA-Linux-x86_64-XXX.XX.XX.run
```

Replace `105` with your container ID and `NVIDIA-Linux-x86_64-XXX.XX.XX.run` with your driver file name.

### Install Driver in Container (Again) with `--no-kernel-modules`

Enter the LXC container shell again and re-run the driver installer, this time with the `--no-kernel-modules` flag:

```bash
cd /root # If you pushed the installer
chmod +x NVIDIA-Linux-x86_64-XXX.XX.XX.run
./NVIDIA-Linux-x86_64-XXX.XX.XX.run --no-kernel-modules
```

**Important:** Using `--no-kernel-modules` prevents the installer from attempting to install kernel modules within the container, as these are already handled by the host and passed through.

## Install NVIDIA Container Toolkit

### Install Dependencies and Add NVIDIA Repository

Inside the LXC container:

```bash
apt install gpg curl
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
apt update
apt install nvidia-container-toolkit
```

**Explanation:**

* Installs `gpg` and `curl` for repository management.
* Downloads and installs the NVIDIA container toolkit GPG key.
* Adds the NVIDIA container toolkit APT repository to your sources list.
* Updates package lists.
* Installs the `nvidia-container-toolkit` package.

### Configure NVIDIA Container Runtime

Edit the `config.toml` file for the NVIDIA container runtime:

```bash
nano /etc/nvidia-container-runtime/config.toml
```

Find the line `#no-cgroups = false` and uncomment it and change `false` to `true`:

```toml
no-cgroups = true
```

Save the file and exit (`Ctrl+X`, `Y`, `Enter` in Nano).

### Reboot the LXC Container

Reboot your LXC container for the changes to take effect:

```bash
reboot
```

After rebooting, your GPU should be passed through to the LXC container. You can verify this by running `nvidia-smi` inside the container.

## Install Docker and Dockge

### Install Docker for Debian Bookworm

Inside the LXC container:

```bash
apt install ca-certificates
apt update
apt install ca-certificates # Run again to ensure ca-certificates are updated
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/trusted.gpg.d/docker.gpg
chmod a+r /etc/apt/trusted.gpg.d/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/trusted.gpg.d/docker.gpg] https://download.docker.com/linux/debian bookworm stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

**Explanation:**

* Installs `ca-certificates` for secure HTTPS connections.
* Downloads and installs the Docker GPG key.
* Adds the Docker APT repository for Debian Bookworm.
* Updates package lists.
* Installs Docker Engine, CLI, containerd, buildx, and compose plugins.

### Enable NVIDIA Container Toolkit for Docker

```bash
nvidia-ctk runtime configure --runtime=docker
systemctl restart docker
```

This configures Docker to use the NVIDIA container runtime by default. Restart Docker to apply the changes.

### Install Dockge Docker Container Manager

```bash
mkdir -p /opt/stacks /opt/dockge
cd /opt/dockge
curl https://raw.githubusercontent.com/louislam/dockge/master/compose.yaml --output compose.yaml
docker compose up -d
```

**Explanation:**

* Creates directories for Dockge data and stacks.
* Downloads the `compose.yaml` file for Dockge.
* Starts Dockge using Docker Compose in detached mode (`-d`).

Dockge will be accessible at `http://<LXC_Container_IP>:5001`.  Find your LXC container's IP address in the Proxmox web interface.

## Example Docker Compose Files for AI Homelab

You can now use Dockge to deploy AI-related Docker containers with GPU acceleration.  Here are example `docker-compose.yaml` files for Ollama, OpenWebUI, SearXNG, and Tika.

**In Dockge:**

1. Go to "Compose" -> "New View".
2. Paste the contents of each `docker-compose.yaml` below into the editor.
3. Click "Save", then "Update", then "Start".

### Ollama Compose

```yaml
version: "3.3"
services:
  ollama:
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities:
                - gpu
    volumes:
      - ollama:/root/.ollama
    ports:
      - 11434:11434
    container_name: ollama
    image: ollama/ollama
    restart: always
volumes:
  ollama: {}
networks:
  dockge_default:
    external: true
  openwebui_default:
    external: true
  searxng_searxng:
    external: true
  tika_default:
    external: true
```

**Explanation:**

* `deploy.resources.reservations.devices`:  Requests NVIDIA GPU resources for the container.
    * `driver: nvidia`: Specifies the NVIDIA driver.
    * `count: all`: Requests all available GPUs.
    * `capabilities: [gpu]`:  Requests GPU capability.

### OpenWebUI Compose

```yaml
version: "3.3"
services:
  open-webui:
    ports:
      - 7000:8080
    volumes:
      - open-webui:/app/backend/data
    container_name: open-webui
    restart: always
    image: ghcr.io/open-webui/open-webui:latest
volumes:
  open-webui: {}
networks:
  dockge_default:
    external: true
  ollama_default:
    external: true
  searxng_searxng:
    external: true
  tika_default:
    external: true
```

**Note:** OpenWebUI will automatically use the GPU if Ollama (or another GPU-accelerated backend) is configured correctly.

### SearXNG and REDIS Compose

```yaml
version: "3.7"
services:
  redis:
    container_name: redis
    image: docker.io/valkey/valkey:7-alpine
    command: valkey-server --save 30 1 --loglevel warning
    restart: unless-stopped
    networks:
      - searxng_searxng
    volumes:
      - valkey-data2:/data
    cap_drop:
      - ALL
    cap_add:
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    logging:
      driver: json-file
      options:
        max-size: 4m
        max-file: "1"
  searxng:
    container_name: searxng
    image: docker.io/searxng/searxng:latest
    restart: unless-stopped
    networks:
      - searxng_searxng
    ports:
      - 7777:8080
    volumes:
      - ./searxng/img:/usr/local/searxng/searx/static/themes/simple/img:rw
      - ./searxng:/etc/searxng:rw
    environment:
      - SEARXNG_BASE_URL=http://${SEARXNG_HOSTNAME:-localhost}/
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
    logging:
      driver: json-file
      options:
        max-size: 4m
        max-file: "1"
networks:
  searxng_searxng:
    external: true
  #searxng: null
  dockge_default:
    external: true
  openwebui_default:
    external: true
  tika_default:
    external: true
  ollama_default:
    external: true
volumes:
  valkey-data2: null
```

### Tika Compose

```yaml
version: "3.3"
services:
  tika:
    ports:
      - 9998:9998
    image: apache/tika:latest-full
    restart: always
networks:
  dockge_default:
    external: true
  openwebui_default:
    external: true
  ollama_default:
    external: true
  searxng_searxng:
    external: true
```

