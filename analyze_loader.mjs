import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Expose an array to store captured loader state
  await page.exposeFunction('saveLoader', (data) => loaderData.push(data));

  // Initialize data storage in page context
  await page.addInitScript(() => {
    window.recordedLoaders = new Map();
    const observer = new MutationObserver(() => {
      document.querySelectorAll('div, section').forEach(el => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        
        // Is it a full-screen overlay?
        if (
          (style.position === 'fixed' || style.position === 'absolute') &&
          style.zIndex >= 50 &&
          rect.width > window.innerWidth * 0.9 &&
          rect.height > window.innerHeight * 0.9 &&
          !window.recordedLoaders.has(el)
        ) {
          window.recordedLoaders.set(el, true);
          window.saveLoader({
            tag: el.tagName,
            className: el.className,
            backgroundColor: style.backgroundColor,
            color: style.color,
            fontFamily: style.fontFamily,
            display: style.display,
            opacity: style.opacity,
            transform: style.transform,
            transition: style.transition,
            animation: style.animation,
            htmlPreview: el.innerHTML.slice(0, 150).replace(/\\s+/g, ' ')
          });
        }
      });
    });
    observer.observe(document, { childList: true, subtree: true, attributes: true });
  });

  const loaderData = [];

  try {
    await page.goto('https://www.stryds.com/');
    await page.waitForTimeout(4000); // Give the intro animation time to play
  } catch (e) {
    console.error('Error navigating:', e);
  }

  // Deduplicate results
  const uniqueItems = Array.from(new Set(loaderData.map(JSON.stringify))).map(JSON.parse);
  
  console.log(JSON.stringify(uniqueItems, null, 2));

  await browser.close();
})();
