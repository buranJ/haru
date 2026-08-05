import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
  const [drawer, styles, globalStyles, packageJson] = await Promise.all([
    readFile(new URL("../src/components/AboutDrawer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/styles/portfolio.module.css", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(drawer, /role="dialog"/);
  assert.match(drawer, /aria-modal="true"/);
  assert.match(drawer, /event\.key === "Escape"/);
  assert.doesNotMatch(drawer, /document\.body\.style\.overflow/);
  assert.match(`${styles}\n${globalStyles}`, /prefers-reduced-motion:\s*reduce/);
  assert.match(packageJson, /"framer-motion"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
