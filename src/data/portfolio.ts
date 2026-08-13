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
    posterSrc: "/videos/commercial-apple-pay.jpg",
    youtubeId: "Smiz_Qadvm0",
    videoAspect: 16 / 9,
    href: "https://www.instagram.com/reel/Dbc8mNDt3AP/",
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
    posterSrc: "/videos/commercial-yandex-go.jpg",
    youtubeId: "nLEsMgA0fRs",
    videoAspect: 139 / 90,
    href: "https://www.instagram.com/reel/DTu8ib7jETw/",
  },
  {
    title: "Макаронная",
    year: "2025",
    category: "Коммерция",
    services: ["Монтаж", "Цветокоррекция", "Моушен-дизайн"],
    posterSrc: "/videos/commercial-macaronnaya.jpg",
    youtubeId: "PbS9fwStsC4",
    videoAspect: 139 / 90,
    href: "https://www.instagram.com/reel/DNHrwIUI2dA/",
  },
];

export const artistProjects: ArtistProject[] = [
  {
    title: "Монеточка\nКис Кис Кис (Live)\nTitle",
    year: "2025",
    services: ["Разработка концепции", "Моушен-дизайн", "Стилизация", "Дизайн"],
    posterSrc: "/videos/artist-monetochka.jpg",
    youtubeId: "IxsDBMib4VQ",
    videoAspect: 16 / 9,
    href: "https://youtu.be/NdDQIXQrLzE",
  },
  {
    title: "Gabrielė Vilkickytė\nTroleibusas\nTitle",
    year: "2024",
    services: ["Разработка концепции", "Отрисовка элементов", "Моушен-дизайн", "Стилизация", "Дизайн"],
    posterSrc: "/videos/artist-troleibusas.jpg",
    youtubeId: "vRBMSfyvHJM",
    videoAspect: 16 / 9,
    href: "https://www.instagram.com/p/DC6PTL0snTL/",
  },
];

export const ledSlides: LedSlide[] = [
  { title: "LED Visual 01", posterSrc: "/videos/led-01.jpg", youtubeId: "S9rA_RwjWHw", videoAspect: 16 / 9 },
  { title: "LED Visual 02", posterSrc: "/videos/led-02.jpg", youtubeId: "79ohtRTwnBs", videoAspect: 16 / 9 },
  { title: "LED Visual 03", posterSrc: "/videos/led-03.jpg", youtubeId: "VOrzZtzQ59s", videoAspect: 16 / 9 },
  { title: "LED Visual 04", posterSrc: "/videos/led-04.jpg", youtubeId: "E30KPN4kjG0", videoAspect: 16 / 9 },
  { title: "LED Visual 05", posterSrc: "/videos/led-05.jpg", youtubeId: "H1dfVoDVzfc", videoAspect: 16 / 9 },
];

export const skillGroups: SkillGroup[] = [
  { heading: "Режиссура", items: ["Разработка концепции"] },
  { heading: "Монтаж, Цветокоррекция", items: ["VFX и композитинг", "Саунд-дизайн", "AI-интеграции"] },
  { heading: "Системное мышление", items: ["Внимание к деталям", "Работа в команде", "Инициативность"] },
  { heading: "Русский язык", items: ["Английский язык (upper-intermediate)"] },
];

export const reels: VideoItem[] = [
  { title: "Reel 01", posterSrc: "/videos/reel-01.jpg", youtubeId: "uQEXbv5bJVY", videoAspect: 9 / 16 },
  { title: "Reel 02", posterSrc: "/videos/reel-02.jpg", youtubeId: "Jsr1ob8aloQ", videoAspect: 9 / 16 },
  { title: "Reel 03", posterSrc: "/videos/reel-03.jpg", youtubeId: "eC812aBUt_I", videoAspect: 9 / 16 },
  { title: "Reel 04", posterSrc: "/videos/reel-04.jpg", youtubeId: "OaW9Ri4oeac", videoAspect: 9 / 16 },
  { title: "Reel 05", posterSrc: "/videos/reel-05.jpg", youtubeId: "-NPrwBPggss", videoAspect: 9 / 16 },
  { title: "Reel 06", posterSrc: "/videos/reel-06.jpg", youtubeId: "dVjgmD_iP9k", videoAspect: 9 / 16 },
  { title: "Reel 07", posterSrc: "/videos/reel-07.jpg", youtubeId: "t3CWGOUngwQ", videoAspect: 9 / 16 },
  { title: "Reel 08", posterSrc: "/videos/reel-08.jpg", youtubeId: "j5Y9uKN31OE", videoAspect: 9 / 16 },
  { title: "Reel 09", posterSrc: "/videos/reel-09.jpg", youtubeId: "TkopC-ZPZGw", videoAspect: 9 / 16 },
  { title: "Reel 10", posterSrc: "/videos/reel-10.jpg", youtubeId: "j8Nx7dCQkVI", videoAspect: 9 / 16 },
  { title: "Reel 11", posterSrc: "/videos/reel-11.jpg", youtubeId: "SnfsLActltA", videoAspect: 9 / 16 },
];

export const posters: VideoItem[] = [
  { title: "Постер 01", posterSrc: "/videos/poster-01.jpg", youtubeId: "G7raW6dz9UU", videoAspect: 9 / 16 },
  { title: "Постер 02", posterSrc: "/videos/poster-02.jpg", youtubeId: "W8ZS4quCo2Q", videoAspect: 9 / 16 },
  { title: "Постер 03", posterSrc: "/videos/poster-03.jpg", youtubeId: "WRmkNkPSed0", videoAspect: 9 / 16 },
  { title: "Постер 04", posterSrc: "/videos/poster-04.jpg", youtubeId: "ppL7bJlImI0", videoAspect: 9 / 16 },
  { title: "Постер 05", posterSrc: "/videos/poster-05.jpg", youtubeId: "aZDrtsv_xgE", videoAspect: 9 / 16 },
];
export type Client = { name: string; logo?: string; href?: string };

export const clients: Client[] = [
  { name: "u!", logo: "/icons/u.png" },
  { name: "ITDOS", logo: "/itdos.svg", href: "https://itdos.dev" },
  { name: "Apple", logo: "/icons/apple.png" },
  { name: "Yandex Go", logo: "/icons/yandex.png" },
  { name: "Макаронная лавка", logo: "/icons/mak.png" },
  { name: "jinalike", logo: "/icons/jinalike.png" },
  { name: "Bakai Bank", logo: "/icons/bakai.png" },
  { name: "Илгери", logo: "/icons/ilgeri.png" },
  { name: "Шоро", logo: "/icons/shoro.png" },
];
export const adobeTools = ["Ps", "Ae", "DaVinci", "Pr", "Au"];
