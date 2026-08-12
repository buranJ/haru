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
    youtubeId: "Smiz_Qadvm0",
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
    youtubeId: "nLEsMgA0fRs",
  },
  {
    title: "Макаронная",
    year: "2025",
    category: "Коммерция",
    services: ["Монтаж", "Цветокоррекция", "Моушен-дизайн"],
    crop: "makaronnaya",
    youtubeId: "PbS9fwStsC4",
  },
];

export const artistProjects: ArtistProject[] = [
  {
    title: "Монеточка\nКис Кис Кис (Live)\nTitle",
    year: "2025",
    services: ["Разработка концепции", "Моушен-дизайн", "Стилизация", "Дизайн"],
    crop: "monetochka",
    youtubeId: "IxsDBMib4VQ",
  },
  {
    title: "Gabrielė Vilkickytė\nTroleibusas\nTitle",
    year: "2024",
    services: ["Разработка концепции", "Отрисовка элементов", "Моушен-дизайн", "Стилизация", "Дизайн"],
    crop: "gabriele",
    youtubeId: "vRBMSfyvHJM",
  },
];

export const ledSlides: LedSlide[] = [
  { title: "LED Visual 01", crop: "ledForest", youtubeId: "S9rA_RwjWHw" },
  { title: "LED Visual 02", crop: "ledComic", youtubeId: "79ohtRTwnBs" },
  { title: "LED Visual 03", crop: "ledRed", youtubeId: "VOrzZtzQ59s" },
  { title: "LED Visual 04", crop: "ledForest", youtubeId: "E30KPN4kjG0" },
  { title: "LED Visual 05", crop: "ledComic", youtubeId: "H1dfVoDVzfc" },
];

export const skillGroups: SkillGroup[] = [
  { heading: "Режиссура", items: ["Разработка концепции", "Art Direction"] },
  { heading: "Монтаж, цветокоррекция", items: ["VFX и композитинг", "Саунд-дизайн", "AI-интеграции"] },
  { heading: "Монтаж, цветокоррекция", items: ["VFX и композитинг", "Саунд-дизайн", "AI-интеграции"] },
  { heading: "Монтаж, цветокоррекция", items: ["VFX и композитинг", "Саунд-дизайн", "AI-интеграции"] },
];

export const reels = [
  { title: "Reel 01", youtubeId: "uQEXbv5bJVY" },
  { title: "Reel 02", youtubeId: "Jsr1ob8aloQ" },
  { title: "Reel 03", youtubeId: "eC812aBUt_I" },
  { title: "Reel 04", youtubeId: "OaW9Ri4oeac" },
  { title: "Reel 05", youtubeId: "-NPrwBPggss" },
  { title: "Reel 06", youtubeId: "dVjgmD_iP9k" },
  { title: "Reel 07", youtubeId: "t3CWGOUngwQ" },
  { title: "Reel 08", youtubeId: "j5Y9uKN31OE" },
  { title: "Reel 09", youtubeId: "TkopC-ZPZGw" },
  { title: "Reel 10", youtubeId: "j8Nx7dCQkVI" },
  { title: "Reel 11", youtubeId: "SnfsLActltA" },
];

export const posters = [
  { title: "Постер 01", youtubeId: "G7raW6dz9UU" },
  { title: "Постер 02", youtubeId: "W8ZS4quCo2Q" },
  { title: "Постер 03", youtubeId: "WRmkNkPSed0" },
  { title: "Постер 04", youtubeId: "ppL7bJlImI0" },
  { title: "Постер 05", youtubeId: "aZDrtsv_xgE" },
];
export const clients = ["u!", "Woop", "● Apple", "Yandex Go", "МАКАРОННАЯ ЛАВКА", "jinalike"];
export const adobeTools = ["Ps", "Ae", "DaVinci", "Pr", "Au"];
