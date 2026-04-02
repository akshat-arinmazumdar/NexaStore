import { test, expect } from "@playwright/test";

function formatErrors(errors: string[]) {
  return errors.length ? errors.join("\n") : "No errors";
}

async function parseCartGrandTotal(page: any) {
  const el = page.locator('[data-testid="cart-grand-total"]').first();
  const txt = (await el.textContent()) || "";
  const num = Number(txt.replace("$", "").trim());
  return Number.isFinite(num) ? num : null;
}

async function parseFirstCartQuantity(page: any) {
  const el = page.locator('[data-testid="cart-quantity"]').first();
  const txt = (await el.textContent()) || "";
  const num = Number(txt.trim());
  return Number.isFinite(num) ? num : null;
}

test.describe("Phase 7 - Mobile Responsive (375px)", () => {
  test.use({ viewport: { width: 375, height: 800 } });

  test("Navbar + Shop + Cart + Checkout works on mobile", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const badResponses: { url: string; status: number }[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => {
      pageErrors.push(String(err));
    });
    page.on("response", (res) => {
      if (res.status() >= 400) {
        badResponses.push({ url: res.url(), status: res.status() });
      }
    });

    const expectNoErrors = async (step: string) => {
      if (consoleErrors.length || pageErrors.length) {
        throw new Error(
          `Console/page errors during ${step}:\n${formatErrors(
            consoleErrors.concat(pageErrors)
          )}`
        );
      }
      if (badResponses.length) {
        throw new Error(
          `HTTP errors (>=400) during ${step}:\n${badResponses
            .slice(0, 20)
            .map((r) => `${r.status} ${r.url}`)
            .join("\n")}`
        );
      }
      consoleErrors.length = 0;
      pageErrors.length = 0;
      badResponses.length = 0;
    };

    // Home: navbar should collapse (mobile menu button present)
    await page.goto("/");
    await expectNoErrors("Home load");
    await expect(
      page.locator("nav").getByRole("link", { name: "NexaStore" })
    ).toBeVisible();

    const menuButton = page.locator('nav button.md\\:hidden').first();
    await expect(menuButton).toBeVisible();
    await menuButton.scrollIntoViewIfNeeded();
    await menuButton.evaluate((el) => (el as HTMLButtonElement).click());
    await expect(page.getByText("Navigation")).toBeVisible();
    await expectNoErrors("Navbar mobile drawer open");

    // Shop: grid loads + Add to Cart works
    await page.goto("/shop");
    await page.waitForTimeout(500);
    const addToCartButtons = page.getByRole("button", {
      name: /add to cart/i,
    });
    await expect(addToCartButtons.first()).toBeVisible({ timeout: 60000 });
    await expectNoErrors("Shop load");

    const grandBefore = await parseCartGrandTotal(page).catch(() => 0);
    await addToCartButtons.first().click();
    await page.goto("/cart");
    await page.waitForSelector('[data-testid="cart-grand-total"]');
    await expectNoErrors("Cart load after add");

    const qty1 = await parseFirstCartQuantity(page);
    expect(qty1).not.toBeNull();
    expect(qty1).toBe(1);

    const grand1 = await parseCartGrandTotal(page);
    expect(grand1).toBeGreaterThan(0);

    // Quantity update
    await page.getByRole("button", { name: "Increase quantity" }).first().click();
    await page.waitForTimeout(250);
    await expectNoErrors("Cart quantity increase");
    const qty2 = await parseFirstCartQuantity(page);
    expect(qty2).not.toBeNull();
    expect(qty2).toBe((qty1 as number) + 1);

    // Remove item
    const removeCount = await page.getByRole("button", { name: /remove/i }).count();
    expect(removeCount).toBeGreaterThan(0);
    await page.getByRole("button", { name: /remove/i }).first().click();
    await page.waitForTimeout(500);
    await expectNoErrors("Cart remove item");

    // Proceed to checkout after re-adding
    await page.goto("/shop");
    await expect(addToCartButtons.first()).toBeVisible({ timeout: 60000 });
    await addToCartButtons.first().click();
    await page.goto("/cart");
    await page.getByRole("link", { name: /proceed to checkout/i }).click();
    await page.waitForURL(/\/checkout/);
    await expectNoErrors("Checkout navigation");
  });
});

