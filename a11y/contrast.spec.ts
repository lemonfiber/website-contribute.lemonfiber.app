import { existsSync, readFileSync } from "node:fs";

import AxeBuilder from "@axe-core/playwright";
import {
  HEADERS_FILE,
  headersViolations,
} from "@lemonfiber/website-kit/headers";
import { layoutViolations, probeLayout } from "@lemonfiber/website-kit/layout";
import { expect, test } from "@playwright/test";

/**
 * One route of every kind the site serves, in both themes: the landing page, a
 * mirrored section's index, a mirrored page from each kind of tree (a
 * directory of notes, a single file, the organisation's health files), and a
 * repository's front door.
 */
const routes = [
  "/",
  "/architecture/",
  "/architecture/error-model/",
  "/brand/colour/",
  "/community/how-change-gets-in/",
  "/community/conduct/",
  "/repos/lemonfiber/",
  "/repos/sdk-ts/",
];
const themes = ["light", "dark"] as const;

for (const route of routes)
  for (const theme of themes)
    test(`${route} has no contrast or a11y violations in ${theme}`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: theme });
      await page.goto(route);
      await page.evaluate((t) => {
        document.documentElement.dataset["theme"] = t;
      }, theme);
      await page.waitForFunction(
        (t) =>
          document.documentElement.dataset["lfTheme"] ===
          (t === "dark" ? "ink" : "paper"),
        theme,
      );

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      expect(results.violations).toEqual([]);
    });

/** The narrowest screen the site is laid out for. */
const PHONE = { width: 375, height: 800 };

for (const route of routes)
  test(`${route} fits a phone's width`, async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto(route);
    expect(layoutViolations(route, await page.evaluate(probeLayout))).toEqual(
      [],
    );
  });

/** The build the suite serves is the one the host is given. */
test("the build carries the headers its host sends", () => {
  const path = `dist/${HEADERS_FILE}`;
  expect(
    headersViolations(existsSync(path) ? readFileSync(path, "utf8") : null),
  ).toEqual([]);
});
