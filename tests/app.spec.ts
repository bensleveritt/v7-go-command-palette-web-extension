import { expect, test } from "./fixtures";

const username = process.env.TEST_EMAIL ?? "";
const password = process.env.TEST_PASSWORD ?? "";

test("launches and closes command palette", async ({ page }) => {
  await page.goto("https://go.v7labs.com");

  // Fill in username and password
  await page.fill("input#username", username);
  await page.fill("input#password", password);

  // Submit the form
  await page.click('button[type="submit"]');

  // Wait for the page to load
  await page.waitForURL("https://go.v7labs.com/**");
  await page.waitForSelector('role=link[name*="Recent projects"]');

  await expect(
    page.getByRole("dialog", { name: /Command Palette/ })
  ).not.toBeVisible();

  // Press cmd+k
  await page.keyboard.down("ControlOrMeta");
  await page.keyboard.press("k");
  await page.keyboard.up("ControlOrMeta");

  await expect(
    page.getByRole("dialog", { name: /Command Palette/ })
  ).toBeVisible();

  // Press cmd+k again
  await page.keyboard.down("ControlOrMeta");
  await page.keyboard.press("k");
  await page.keyboard.up("ControlOrMeta");

  await expect(
    page.getByRole("dialog", { name: /Command Palette/ })
  ).not.toBeVisible();
});

test("escape closes the command palette", async ({ page }) => {
  await page.goto("https://go.v7labs.com");

  // Fill in username and password
  await page.fill("input#username", username);
  await page.fill("input#password", password);

  // Submit the form
  await page.click('button[type="submit"]');

  // Wait for the page to load
  await page.waitForURL("https://go.v7labs.com/**");
  await page.waitForSelector('role=link[name*="Recent projects"]');

  // Press cmd+k
  await page.keyboard.down("ControlOrMeta");
  await page.keyboard.press("k");
  await page.keyboard.up("ControlOrMeta");

  await expect(
    page.getByRole("dialog", { name: /Command Palette/ })
  ).toBeVisible();

  // Press cmd+k again
  await page.keyboard.press("Escape");

  await expect(
    page.getByRole("dialog", { name: /Command Palette/ })
  ).not.toBeVisible();
});

test("keyboard navigates suggestions", async ({ page }) => {
  await page.goto("https://go.v7labs.com");

  // Fill in username and password
  await page.fill("input#username", username);
  await page.fill("input#password", password);

  // Submit the form
  await page.click('button[type="submit"]');

  // Wait for the page to load
  await page.waitForURL("https://go.v7labs.com/**");
  await page.waitForSelector('role=link[name*="Recent projects"]');

  // Press cmd+k
  await page.keyboard.down("ControlOrMeta");
  await page.keyboard.press("k");
  await page.keyboard.up("ControlOrMeta");

  await expect(
    page.getByRole("dialog", { name: /Command Palette/ })
  ).toBeVisible();

  const searchInput = page.getByRole("textbox", { name: "Search" });

  await expect(searchInput).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("menuitem").nth(0)).toBeFocused();

  await page.keyboard.press("ArrowUp");
  await expect(searchInput).toBeFocused();
});
