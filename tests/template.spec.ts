import { test, expect } from "@playwright/test";
test("temas: claro inicial, persistência e controle mobile", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  const lightBackground = await page
    .locator("body")
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  const darkToggle = page.getByRole("button", { name: "Ativar modo escuro" });
  await darkToggle.focus();
  await page.keyboard.press("Space");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const darkBackground = await page
    .locator("body")
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(darkBackground).not.toBe(lightBackground);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Ativar modo claro" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page.getByRole("button", { name: "Ativar modo claro" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(errors).toEqual([]);
});
test("layouts, interações e redução de movimento", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("Espaços para");
  for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(300);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      `overflow em ${width}`,
    ).toBeTruthy();
    if (width < 768) {
      const headingFits = await page
        .locator(".hero-line")
        .first()
        .evaluate((element) => {
          const text = element.firstElementChild?.getBoundingClientRect();
          return !text || text.right <= window.innerWidth - 15;
        });
      expect(headingFits, `título cortado em ${width}`).toBeTruthy();
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "O estúdio" })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const question = page.getByRole("button", {
    name: "Como começamos um projeto?",
  });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#faq-answer-0")).toBeVisible();
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "false");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload();
  await expect(page.locator(".lenis")).toHaveCount(0);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator(".story-mobile-image")).toHaveCount(3);
  expect(errors).toEqual([]);
});

test("scroll desktop, pin e resize sem duplicação", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator(".pin-spacer")).toHaveCount(2);
  const storyTop = await page
    .locator(".story-section")
    .evaluate(
      (element) => element.getBoundingClientRect().top + window.scrollY,
    );
  await page.evaluate((top) => window.scrollTo(0, top + 1400), storyTop);
  await page.waitForTimeout(1200);
  await expect(page.locator("[data-story-panel]").last()).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator(".header")).toHaveClass(/is-scrolled/);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator(".pin-spacer")).toHaveCount(2);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".pin-spacer")).toHaveCount(2);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator(".hero-image img")).toBeVisible();
  expect(
    await page
      .locator(".hero-image img")
      .evaluate((element) => (element as HTMLImageElement).naturalWidth),
  ).toBeGreaterThan(0);
});
