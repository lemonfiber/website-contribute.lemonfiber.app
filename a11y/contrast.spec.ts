import AxeBuilder from "@axe-core/playwright";
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
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      expect(results.violations).toEqual([]);
    });
