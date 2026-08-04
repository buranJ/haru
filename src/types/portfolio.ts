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
}

export interface ArtistProject {
  title: string;
  year: string;
  services: string[];
  crop: CropName;
}

export interface NavItem {
  id: WorkCategory;
  label: string;
}

export interface LedSlide {
  title: string;
  crop: CropName;
}

export interface SkillGroup {
  heading: string;
  items: string[];
}
