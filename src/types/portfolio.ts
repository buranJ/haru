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
  videoSrc: string;
}

export interface ArtistProject {
  title: string;
  year: string;
  services: string[];
  crop: CropName;
  videoSrc: string;
}

export interface NavItem {
  id: WorkCategory;
  label: string;
}

export interface LedSlide {
  title: string;
  crop: CropName;
  videoSrc: string;
}

export interface VideoItem {
  title: string;
  videoSrc: string;
}

export interface SkillGroup {
  heading: string;
  items: string[];
}
