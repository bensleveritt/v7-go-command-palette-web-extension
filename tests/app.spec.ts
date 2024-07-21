import { expect, test } from "./fixtures";

test("launches command palette", async ({ page }) => {
  await page.goto("https://go.v7labs.com");

  // Fill in username and password
  await page.fill("input#username", process.env.TEST_EMAIL);
  await page.fill("input#password", process.env.TEST_PASSWORD);

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
});

// test('popup page', async ({ page, extensionId }) => {
//   await page.goto(`chrome-extension://${extensionId}/popup.html`);
//   await expect(page.locator('body')).toHaveText('my-extension popup');
// });
