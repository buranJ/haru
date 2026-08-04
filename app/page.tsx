import type { Metadata } from "next";
import { PortfolioPage } from "../src/components/PortfolioPage";

export const metadata: Metadata = {
  title: "Николь Назаркулова — Motion Designer",
  description: "Портфолио motion-дизайнера Николь Назаркуловой: коммерция, визуалы для артистов, Reels и постеры.",
};

export default function Home() {
  return <PortfolioPage />;
}
