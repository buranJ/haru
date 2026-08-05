import type {
  ArtistProject,
  CommercialProject,
  LedSlide,
  NavItem,
  SkillGroup,
} from "../types/portfolio";

export const navigation: NavItem[] = [
  { id: "commercial", label: "Коммерция" },
  { id: "artists", label: "Артисты" },
  { id: "reels", label: "Reels" },
  { id: "posters", label: "Постеры" },
];

export const commercialProjects: CommercialProject[] = [
  {
    title: "BAKAI x ApplePay\nCommercial",
    year: "2026",
    category: "Коммерция",
    services: ["Монтаж, Цветокоррекция", "VFX и композитинг", "AI-интеграции", "Саунд-дизайн"],
    crop: "applePay",
  },
  {
    title: "BAKAI x YandexGo",
    year: "2026",
    category: "Коммерция",
    services: [
      "Монтаж, Цветокоррекция",
      "VFX и композитинг",
      "Моушен-дизайн",
      "Саунд-дизайн",
      "AI-интеграции",
      "Разработка концепции",
      "Режиссура",
    ],
    crop: "yandexGo",
  },
  {
    title: "Макаронная",
    year: "2025",
    category: "Коммерция",
    services: ["Монтаж", "Цветокоррекция", "Моушен-дизайн"],
    crop: "makaronnaya",
  },
];

export const artistProjects: ArtistProject[] = [
  {
    title: "Монеточка\nКис Кис Кис (Live)\nTitle",
    year: "2025",
    services: ["Разработка концепции", "Моушн-дизайн", "Супервизия", "Дизайн"],
    crop: "monetochka",
  },
  {
    title: "Gabrielė Vilkickytė\nTroleibusas\nTitle",
    year: "2024",
    services: ["Разработка концепции", "Отрисовка элементов", "Моушн-дизайн", "Супервизия", "Дизайн"],
    crop: "gabriele",
  },
];

export const ledSlides: LedSlide[] = [
  { title: "Лесной свет", crop: "ledForest" },
  { title: "Pop-art visual", crop: "ledComic" },
  { title: "Red figure", crop: "ledRed" },
];

export const skillGroups: SkillGroup[] = [
  { heading: "Режиссура", items: ["Разработка концепции", "Art Direction"] },
  { heading: "Моушн, циклопроекция", items: ["VFX-композитинг", "Саунд-дизайн", "AI-интеграция"] },
  { heading: "Моушн, циклопроекция", items: ["VFX-композитинг", "Саунд-дизайн", "AI-интеграция"] },
  { heading: "Моушн, циклопроекция", items: ["VFX-композитинг", "Саунд-дизайн", "AI-интеграция"] },
];

export const reels = Array.from({ length: 12 }, (_, index) => `Reel ${index + 1}`);
export const posters = Array.from({ length: 6 }, (_, index) => `Постер ${index + 1}`);
export const clients = ["u!", "Woop", "● Apple", "Yandex Go", "МАКАРОННАЯ ЛАВКА", "jinalike"];
export const adobeTools = ["Ps", "Ae", "Ai", "Pr", "Au"];
