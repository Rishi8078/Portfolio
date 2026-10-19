import { imageSizes } from './image-sizes';

/**
 * Photos and captions for the Photography gallery.
 * Put full-size originals in `originals/`, run `python3 scripts/optimize_images.py`,
 * then add a line here using the file name without its extension.
 */
export type GalleryPhoto = { id: string; url: string; caption: string; width: number; height: number };

const photo = (id: string, name: string, caption: string): GalleryPhoto => {
  const [width, height] = imageSizes[name];
  return { id, url: `/img/${name}.webp`, caption, width, height };
};

export const galleryPhotos: GalleryPhoto[] = [
  photo('photo-0', 'IMG_8008', 'A very lost mini lion'),
  photo('photo-1', 'IMG_3970', 'The Bavarian Alps.'),
  photo('photo-2', 'PMK00481', 'Sikhim and the Himalayas'),
  photo('photo-3', 'PMK00992', 'Markets in Meghalaya'),
  photo('photo-4', 'IMG_786113', 'Reflection'),
  photo('photo-5', 'IMG_3832', 'Happiness'),
  photo('photo-6', 'IMG_1550', 'Lost at sea in a drift boat'),
  photo('photo-7', 'DSC09249', 'Mr. Bean spotted in Czechia'),
  photo('photo-8', 'IMG_7610', 'life is a journey'),
  photo('photo-9', 'IMG_7623', 'mighty dolomites'),
  photo('photo-10', 'IMG_3590', 'mountains in the distance'),
  photo('photo-11', 'IMG_3976', 'I wanna live here'),
  photo('photo-12', 'IMG_1931', 'Croatian summer'),
  photo('photo-13', 'PMK00619', 'stability and order'),
  photo('photo-14', 'IMG_8187', 'Inside a snowglobe'),
  photo('photo-15', 'IMG_7477', 'Fossilized dragon teeth discovered in italy'),
  photo('photo-16', 'IMG_3613', 'terqouise is the most beautiful color in the world'),
  photo('photo-17', 'IMG_7949', 'lake high up in the mountains'),
  photo('photo-18', 'IMG_7962', 'Mom i can fly!'),
  photo('photo-19', 'IMG_3836', 'sunset over the ocean'),
  photo('photo-20', 'IMG_7927', 'Flight logs'),
  photo('photo-21', 'IMG_7616', 'Its a painting by a 12 year old'),
  photo('photo-22', 'IMG_4430', 'picture of a picture'),
  photo('photo-23', 'PMK01089edit', 'Root bridge in Meghalaya'),
];
