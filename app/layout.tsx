import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.URL ?? "https://nikol-nazarkulova-portfolio.vaibex-3765.chatgpt.site";
const title = "Николь Назаркулова — Motion Designer";
const description = "Портфолио motion-дизайнера Николь Назаркуловой.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: { icon: "/favicon-n.svg", shortcut: "/favicon-n.svg" },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
