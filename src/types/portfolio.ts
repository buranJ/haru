export type WorkCategory = "commercial" | "artists" | "reels" | "posters";

export type CropName =
  | "applePay"
  | "yandexGo"
  | "makaronnaya"
  | "monetochka"
  | "gabriele"
  | "ledForest"
  | "ledComic"
  | "ledRed";

export interface CommercialProject {
  title: string;
  year: string;
  category: string;
  services: string[];
  crop: CropName;
  posterSrc: string;
  youtubeId: string;
  videoAspect: number;
  /** Where the published work lives; opens in a new tab from the media. */
  href?: string;
}

export interface ArtistProject {
  title: string;
  year: string;
  services: string[];
  crop: CropName;
  posterSrc: string;
  youtubeId: string;
  videoAspect: number;
  href?: string;
}

export interface NavItem {
  id: WorkCategory;
  label: string;
}

export interface LedSlide {
  title: string;
  crop: CropName;
  posterSrc: string;
  youtubeId: string;
  videoAspect: number;
}

export interface VideoItem {
  title: string;
  posterSrc: string;
  youtubeId: string;
  videoAspect: number;
}

export interface SkillGroup {
  heading: string;
  items: string[];
}
