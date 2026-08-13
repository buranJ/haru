import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="ru">/i);
  assert.match(html, /<title>Николь Назаркулова — Motion Designer<\/title>/i);
  assert.match(html, /BAKAI x ApplePay/);
  assert.match(html, /LED Visuals Showcase/);
  assert.match(html, /Reels Showcase/);
  assert.match(html, /Клиенты и партнеры/);
  assert.match(html, /property="og:image"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps accessibility and reduced-motion behavior in source", async () => {
  const [drawer, heroSwitch, slider, styles, globalStyles, packageJson] = await Promise.all([
    readFile(new URL("../src/components/AboutDrawer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/HeroModeSwitch.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/VerticalSlider.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/styles/portfolio.module.css", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(drawer, /role="dialog"/);
  assert.match(drawer, /aria-modal="true"/);
  assert.match(drawer, /event\.key === "Escape"/);
  assert.match(drawer, /duration:\s*1\.04/);
  assert.doesNotMatch(drawer, /initial=\{\{\s*x:/);
  assert.match(heroSwitch, /Открыть экран «Обо мне»/);
  assert.match(heroSwitch, /Вернуться к экрану работ/);
  assert.match(heroSwitch, /aria-controls="about-drawer"/);
  assert.match(heroSwitch, /opensAbout \? "о себе" : "к работам"/);
  assert.match(drawer, /ref=\{returnButtonRef\} mode="work"/);
  assert.match(styles, /\.heroIdentity \.heroModeSwitch\s*\{[^}]*margin-top:\s*48px/s);
  assert.match(styles, /\.aboutCopy \.heroModeSwitch\s*\{[^}]*margin-top:\s*50px/s);
  assert.doesNotMatch(drawer, /document\.body\.style\.overflow/);
  assert.match(slider, /event\.preventDefault\(\)/);
  assert.match(slider, /passive:\s*false/);
  assert.match(slider, /event\.key === "ArrowDown"/);
  assert.match(`${styles}\n${globalStyles}`, /prefers-reduced-motion:\s*reduce/);
  assert.match(packageJson, /"framer-motion"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("uses the supplied Product Sans family with deliberate editorial weights", async () => {
  const [styles, globalStyles] = await Promise.all([
    readFile(new URL("../src/styles/portfolio.module.css", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(globalStyles, /--font-sans:\s*"Product Sans"/);
  assert.match(globalStyles, /font-family:\s*var\(--font-sans\)/);
  assert.match(globalStyles, /font-synthesis:\s*none/);
  assert.match(styles, /\.defaultHeroName\s*\{[^}]*font-weight:\s*500/s);
  assert.match(styles, /\.projectInfo h3\s*\{[^}]*font-weight:\s*500/s);
  assert.match(styles, /\.projectMeta\s*\{[^}]*font-weight:\s*300/s);
  assert.match(styles, /\.sectionIntro h2,[\s\S]*?font-weight:\s*500/);
});

test("ships adaptive, muted, viewport-lazy YouTube players", async () => {
  const [player, reels, verticalSlider, posters, data, styles, videoFiles] = await Promise.all([
    readFile(new URL("../src/components/PortfolioVideo.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/ReelsShowcase.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/VerticalSlider.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/PostersSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/data/portfolio.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/styles/portfolio.module.css", import.meta.url), "utf8"),
    readdir(new URL("../public/videos/", import.meta.url)),
  ]);

  assert.match(player, /new IntersectionObserver/);
  assert.match(player, /preloadMargin/);
  assert.match(player, /unloadDelay/);
  assert.doesNotMatch(player, /isPresentationReady|setIsPresentationReady|2600/);
  assert.match(player, /enabled/);
  assert.match(reels, /enabled=\{activeReelKey ===/);
  assert.match(verticalSlider, /fit="contain"/);
  assert.match(posters, /fit="contain"/);
  assert.match(styles, /\.videoContain \.videoPoster\s*\{[^}]*object-fit:\s*contain/s);
  assert.match(styles, /aspect-ratio:\s*calc\(var\(--poster-count\) \* 9\) \/ 16/);
  assert.match(player, /typeof player\?\.pauseVideo === "function"/);
  assert.match(player, /if \(!player \|\| !isReady\) return/);
  assert.match(player, /if \(disposed\) return/);
  assert.match(player, /youtube\.com\/iframe_api/);
  assert.match(player, /destroyPlayer\(playerRef\.current\)/);
  assert.match(player, /controls:\s*0/);
  assert.match(player, /mute:\s*1/);
  assert.match(player, /player\.mute\(\)/);
  assert.match(player, /playsinline:\s*1/);
  assert.doesNotMatch(player, /playlist:\s*youtubeId|loop:\s*1/);
  assert.match(styles, /youtubeApiMount iframe/);
  assert.match(styles, /object-fit:\s*cover/);
  assert.match(styles, /animation:\s*reelsMarquee 56s linear infinite/);
  assert.doesNotMatch(styles, /\.reelCard\s*\{[^}]*padding:\s*14px/s);
  assert.doesNotMatch(player, /<video/);
  assert.equal((data.match(/youtubeId:/g) ?? []).length, 26);

  const mp4Files = videoFiles.filter((file) => file.endsWith(".mp4"));
  const posterFiles = videoFiles.filter((file) => file.endsWith(".jpg"));
  assert.equal(mp4Files.length, 0);
  assert.equal(posterFiles.length, 26);

  const sizes = await Promise.all(
    posterFiles.map((file) => stat(new URL(`../public/videos/${file}`, import.meta.url))),
  );
  assert.ok(sizes.every(({ size }) => size > 0 && size < 250 * 1024));
});
