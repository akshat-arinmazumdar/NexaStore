import { test, expect } from "@playwright/test";
import { PrismaClient } from "@prisma/client";

function formatErrors(errors: string[]) {
  return errors.length ? errors.join("\n") : "No errors";
}

async function getVisibleFeaturedCount(page: any) {
  // Home page: featured products are rendered under #shop.
  const links = page.locator('#shop a[href^="/shop/"]');
  return links.count();
}

async function getAddToCartCount(page: any) {
  const buttons = page.getByRole("button", { name: /add to cart/i });
  return buttons.count();
}

async function getShopDisplayedPrices(page: any) {
  // Shop product cards have: div.glass.group ... includes price spans like "$49.99".
  // We take the first "$..." span inside each card (current price).
  const prices = await page.$$eval(
    "div.glass.group",
    (cards: HTMLElement[]) => {
    const toNumber = (t: string) => {
      const cleaned = t.replace("$", "").trim();
      const num = Number(cleaned);
      return Number.isFinite(num) ? num : null;
    };
    return cards.map((card) => {
      const spans = Array.from(card.querySelectorAll("span"))
        .map((s) => (s.textContent || "").trim())
        .filter((t) => t.startsWith("$"));
      if (!spans.length) return null;
      return toNumber(spans[0]);
    }).filter((n): n is number => typeof n === "number");
    }
  );
  return prices;
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

test.describe.serial("Phase 3 - Page Tests", () => {
  test("Home -> Shop -> Product Detail -> Cart -> Auth -> Dashboard -> Checkout", async ({
    page,
  }) => {
    const prisma = new PrismaClient();
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
        const httpErrors = badResponses.length
          ? `\nHTTP errors (>=400) during ${step}:\n${badResponses
              .slice(0, 20)
              .map((r) => `${r.status} ${r.url}`)
              .join("\n")}`
          : "";
        throw new Error(
          `Console/page errors during ${step}:\n${formatErrors(
            consoleErrors.concat(pageErrors)
          )}${httpErrors}`
        );
      }
      if (badResponses.length) {
        throw new Error(
          `HTTP errors during ${step}:\n${badResponses
            .slice(0, 20)
            .map((r) => `${r.status} ${r.url}`)
            .join("\n")}`
        );
      }
      consoleErrors.length = 0;
      pageErrors.length = 0;
      badResponses.length = 0;
    };

    // Ensure registration credentials are fresh for repeated test runs.
    // Otherwise `/register` may fail with "Email already exists".
    await prisma.user.deleteMany({ where: { email: "testuser@test.com" } });
    await prisma.$disconnect();

    // TEST 1 — Home Page
    await page.goto("/");
    await page.waitForSelector("#shop");
    const homeAddToCartButtons = page.getByRole("button", {
      name: /add to cart/i,
    });
    await expect(homeAddToCartButtons.first()).toBeVisible({ timeout: 60000 });
    await expectNoErrors("Home");
    const featuredCount = await homeAddToCartButtons.count();
    expect(featuredCount).toBeGreaterThan(0);

    // TEST 2 — Shop Page
    await page.goto("/shop");
    const addToCartButtons = page.getByRole("button", {
      name: /add to cart/i,
    });
    await expect(addToCartButtons).toHaveCount(10, { timeout: 60000 });
    await expectNoErrors("Shop initial");

    const shopAddToCartCount = await addToCartButtons.count();
    expect(shopAddToCartCount).toBe(10);

    // Search "SaaS"
    const searchInputs = page.locator('input[placeholder="Search products..."]');
    const inputCount = await searchInputs.count();
    let searchInput: any = null;
    for (let i = 0; i < inputCount; i++) {
      const candidate = searchInputs.nth(i);
      if (await candidate.isVisible()) {
        searchInput = candidate;
        break;
      }
    }
    expect(searchInput).not.toBeNull();
    await searchInput.fill("");
    await searchInput.type("SaaS");
    await page.waitForTimeout(250);
    await expectNoErrors("Shop search");

    const filteredCount = await getAddToCartCount(page);
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThan(10);

    // Category filter "SaaS Tools"
    await page
      .getByRole("button", { name: "SaaS Tools" })
      .click();
    await page.waitForTimeout(250);
    await expectNoErrors("Shop category filter");
    const categoryCount = await getAddToCartCount(page);
    expect(categoryCount).toBeGreaterThan(0);
    expect(categoryCount).toBeLessThanOrEqual(10);

    // Sort price low to high
    await page.locator("select").selectOption("price-low");
    await page.waitForTimeout(250);
    await expectNoErrors("Shop sort");
    const prices = await getShopDisplayedPrices(page);
    expect(prices.length).toBeGreaterThan(0);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }

    // Add to cart from shop
    await addToCartButtons.first().click();
    await page.waitForTimeout(250);
    await expectNoErrors("Shop add to cart");

    await page.goto("/cart");
    await page.waitForSelector('[data-testid="cart-grand-total"]');
    await expectNoErrors("Cart after add");
    const cartQuantity1 = await parseFirstCartQuantity(page);
    expect(cartQuantity1).toBe(1);

    // TEST 3 — Product Detail page
    await page.goto("/shop");
    await expect(addToCartButtons).toHaveCount(10, { timeout: 60000 });
    await expectNoErrors("Shop before product detail");

    const productLink = page.locator('a[href^="/shop/"]').first();
    const productHref = await productLink.getAttribute("href");
    expect(productHref).toBeTruthy();
    const productSlug = String(productHref).split("/").pop();
    await productLink.click();
    await page.waitForSelector("h1");
    await expectNoErrors("Product detail load");

    // Verify detail content
    await expect(page.getByText(/features/i)).toBeVisible();
    await expect(page.getByText(/tech stack/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /add to cart/i })
    ).toBeVisible();

    // Read current cart total by visiting /cart, then come back.
    await page.goto("/cart");
    await page.waitForSelector('[data-testid="cart-grand-total"]', { timeout: 60000 });
    await expectNoErrors("Cart before detail add");
    const totalBefore = (await parseCartGrandTotal(page)) ?? 0;

    await page.goto(`/shop/${productSlug}`);
    await page.waitForSelector("h1");
    await expectNoErrors("Product detail reload");

    // Add from detail
    await page.getByRole("button", { name: /add to cart/i }).click();
    await page.waitForTimeout(250);
    await expectNoErrors("Product detail add");

    await page.goto("/cart");
    await page.waitForSelector('[data-testid="cart-grand-total"]');
    await expectNoErrors("Cart after detail add");
    const totalAfter = (await parseCartGrandTotal(page)) ?? 0;
    expect(totalAfter).toBeGreaterThan(totalBefore);

    // TEST 4 — Cart page quantity + remove + totals + checkout link
    await page.waitForSelector('[data-testid="cart-quantity"]');
    const qtyBefore = (await parseFirstCartQuantity(page)) ?? 1;
    const grandBefore = (await parseCartGrandTotal(page)) ?? 0;

    await page
      .getByRole("button", { name: "Increase quantity" })
      .first()
      .click();
    await page.waitForTimeout(250);
    await expectNoErrors("Cart quantity increase");

    const qtyAfter = await parseFirstCartQuantity(page);
    expect(qtyAfter).toBe(qtyBefore + 1);
    const grandAfter = (await parseCartGrandTotal(page)) ?? 0;
    expect(grandAfter).toBeGreaterThan(grandBefore);

    // Decrease back
    await page
      .getByRole("button", { name: "Decrease quantity" })
      .first()
      .click();
    await page.waitForTimeout(250);
    await expectNoErrors("Cart quantity decrease");
    const qtyBack = await parseFirstCartQuantity(page);
    expect(qtyBack).toBe(qtyBefore);

    // Remove a single item -> verify cart updates
    const removeCountBefore = await page.getByRole("button", {
      name: /remove/i,
    }).count();

    await page
      .getByRole("button", { name: /remove/i })
      .first()
      .click();
    await page.waitForTimeout(500);
    await expectNoErrors("Cart remove item");

    const removeCountAfter = await page.getByRole("button", {
      name: /remove/i,
    }).count();

    expect(removeCountAfter).toBe(Math.max(0, removeCountBefore - 1));

    if (removeCountAfter === 0) {
      await expect(page.getByText(/your cart is empty/i)).toBeVisible({
        timeout: 20000,
      });
    }

    // Proceed to Checkout should work after re-adding an item
    await page.goto("/shop");
    await expect(addToCartButtons).toHaveCount(10, { timeout: 60000 });
    await addToCartButtons.first().click();
    await page.waitForTimeout(250);
    await page.goto("/cart");
    await page.waitForSelector('[data-testid="cart-grand-total"]');
    await expectNoErrors("Cart before checkout");

    await page.getByRole("link", { name: /proceed to checkout/i }).click();
    await page.waitForURL(/\/checkout/);
    await expectNoErrors("Checkout navigation");

    // TEST 5 — Auth Flow
    // We will log out if already logged in (safe).
    // If not logged in, navbar shows "Login".
    const loginLink = page.getByRole("link", { name: /login/i }).first();
    const dashboardLink = page.getByRole("link", { name: /dashboard/i }).first();
    const isDashboardVisible = await dashboardLink.isVisible().catch(() => false);
    if (isDashboardVisible) {
      await page.getByRole("button", { name: /logout/i }).click();
      await page.waitForURL("/", { timeout: 30000 }).catch(() => {});
    }

    await page.goto("/register");
    await expect(page.getByRole("heading", { name: /create creator account/i })).toBeVisible();
    await page.getByPlaceholder("John Doe").fill("Test User");
    await page.getByPlaceholder("john@example.com").fill("testuser@test.com");
    await page.getByPlaceholder("••••••••").fill("Test@1234");
    await page.getByRole("button", { name: /register hub account/i }).click();
    await page.waitForURL(/\/login/);
    await expectNoErrors("Register flow");
    await expect(page.getByText(/registration successful/i)).toBeVisible();

    await page.goto("/login");
    await page.getByPlaceholder("john@example.com").fill("testuser@test.com");
    await page.getByPlaceholder("••••••••").fill("Test@1234");
    await page.getByRole("button", { name: /sign in/i }).click();
    await page.waitForURL(/\/dashboard/);
    await expectNoErrors("Login flow");

    // TEST 6 — Dashboard
    await page.waitForSelector("h1");
    await expect(page.getByText("My Overview")).toBeVisible();
    await expect(
      page.locator("text=/test user/i")
    ).toBeVisible();

    // Email should be visible in dashboard sidebar.
    await expect(page.getByText("testuser@test.com")).toBeVisible();

    // Protected dashboard: sign out then access /dashboard
    await page.getByRole("button", { name: /sign out/i }).click();
    await page.waitForURL("/", { timeout: 30000 }).catch(() => {});
    // Give NextAuth session fetch a moment to settle to avoid transient
    // ClientFetchError logs during fast navigation.
    await page.waitForTimeout(2000);
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/, { timeout: 30000 });
    await expectNoErrors("Dashboard protection");

    // TEST 7 — Checkout summary
    // Ensure cart has at least one item; add it again.
    await page.goto("/shop");
    await expect(addToCartButtons).toHaveCount(10, { timeout: 60000 });
    await addToCartButtons.first().click();
    await page.goto("/cart");
    await page.waitForSelector('[data-testid="cart-grand-total"]');
    await page.getByRole("link", { name: /proceed to checkout/i }).click();
    await page.waitForURL(/\/checkout/);
    await expectNoErrors("Checkout page load");
    await expect(page.getByText(/secured order summary/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /pay securely now/i })).toBeVisible();
  });
});

