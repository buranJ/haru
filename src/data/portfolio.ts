import type {
  ArtistProject,
  CommercialProject,
  LedSlide,
  NavItem,
  SkillGroup,
  VideoItem,
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
    videoSrc: "/videos/commercial-apple-pay.mp4",
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
    videoSrc: "/videos/commercial-yandex-go.mp4",
  },
  {
    title: "Макаронная",
    year: "2025",
    category: "Коммерция",
    services: ["Монтаж", "Цветокоррекция", "Моушен-дизайн"],
    crop: "makaronnaya",
    videoSrc: "/videos/commercial-macaronnaya.mp4",
  },
];

export const artistProjects: ArtistProject[] = [
  {
    title: "Монеточка\nКис Кис Кис (Live)\nTitle",
    year: "2025",
    services: ["Разработка концепции", "Моушен-дизайн", "Стилизация", "Дизайн"],
    crop: "monetochka",
    videoSrc: "/videos/artist-monetochka.mp4",
  },
  {
    title: "Gabrielė Vilkickytė\nTroleibusas\nTitle",
    year: "2024",
    services: ["Разработка концепции", "Отрисовка элементов", "Моушен-дизайн", "Стилизация", "Дизайн"],
    crop: "gabriele",
    videoSrc: "/videos/artist-troleibusas.mp4",
  },
];

export const ledSlides: LedSlide[] = [
  { title: "LED Visual 01", crop: "ledForest", videoSrc: "/videos/led-01.mp4" },
  { title: "LED Visual 02", crop: "ledComic", videoSrc: "/videos/led-02.mp4" },
  { title: "LED Visual 03", crop: "ledRed", videoSrc: "/videos/led-03.mp4" },
  { title: "LED Visual 04", crop: "ledForest", videoSrc: "/videos/led-04.mp4" },
  { title: "LED Visual 05", crop: "ledComic", videoSrc: "/videos/led-05.mp4" },
];

export const skillGroups: SkillGroup[] = [
  { heading: "Режиссура", items: ["Разработка концепции", "Art Direction"] },
  { heading: "Монтаж, цветокоррекция", items: ["VFX и композитинг", "Саунд-дизайн", "AI-интеграции"] },
  { heading: "Монтаж, цветокоррекция", items: ["VFX и композитинг", "Саунд-дизайн", "AI-интеграции"] },
  { heading: "Монтаж, цветокоррекция", items: ["VFX и композитинг", "Саунд-дизайн", "AI-интеграции"] },
];

export const reels: VideoItem[] = [
  { title: "Reel 01", videoSrc: "/videos/reel-01.mp4" },
  { title: "Reel 02", videoSrc: "/videos/reel-02.mp4" },
  { title: "Reel 03", videoSrc: "/videos/reel-03.mp4" },
  { title: "Reel 04", videoSrc: "/videos/reel-04.mp4" },
  { title: "Reel 05", videoSrc: "/videos/reel-05.mp4" },
  { title: "Reel 06", videoSrc: "/videos/reel-06.mp4" },
  { title: "Reel 07", videoSrc: "/videos/reel-07.mp4" },
  { title: "Reel 08", videoSrc: "/videos/reel-08.mp4" },
  { title: "Reel 09", videoSrc: "/videos/reel-09.mp4" },
  { title: "Reel 10", videoSrc: "/videos/reel-10.mp4" },
  { title: "Reel 11", videoSrc: "/videos/reel-11.mp4" },
];

export const posters: VideoItem[] = [
  { title: "Постер 01", videoSrc: "/videos/poster-01.mp4" },
  { title: "Постер 02", videoSrc: "/videos/poster-02.mp4" },
  { title: "Постер 03", videoSrc: "/videos/poster-03.mp4" },
  { title: "Постер 04", videoSrc: "/videos/poster-04.mp4" },
  { title: "Постер 05", videoSrc: "/videos/poster-05.mp4" },
];
export const clients = ["u!", "Woop", "● Apple", "Yandex Go", "МАКАРОННАЯ ЛАВКА", "jinalike"];
export const adobeTools = ["Ps", "Ae", "DaVinci", "Pr", "Au"];
