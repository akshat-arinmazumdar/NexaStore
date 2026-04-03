import { test, expect } from "@playwright/test";
import { PrismaClient } from "@prisma/client";

test("Phase 4 - API routes", async ({ page, request }) => {
  const prisma = new PrismaClient();
  const email = "testuser@test.com";
  const password = "Test@1234";

  try {
    // Ensure a clean slate for duplicate-email test.
    await prisma.user.deleteMany({ where: { email } });
    // No need to delete related rows: schema cascades where appropriate.
  } finally {
    await prisma.$disconnect();
  }

  // 1) GET /api/products
  const resAll = await request.get("/api/products");
  expect(resAll.status()).toBe(200);
  const all = await resAll.json();
  expect(Array.isArray(all)).toBe(true);
  expect(all.length).toBeGreaterThanOrEqual(10);

  // search=saas
  const resSearch = await request.get("/api/products?search=saas");
  expect(resSearch.status()).toBe(200);
  const searchJson = await resSearch.json();
  expect(Array.isArray(searchJson)).toBe(true);
  expect(searchJson.length).toBeGreaterThan(0);

  // category=SAAS (should map to enum SAAS_TOOL)
  const resCategory = await request.get("/api/products?category=SAAS");
  expect(resCategory.status()).toBe(200);
  const categoryJson = await resCategory.json();
  expect(Array.isArray(categoryJson)).toBe(true);
  expect(categoryJson.length).toBeGreaterThan(0);
  categoryJson.forEach((p: any) => expect(p.category).toBe("SAAS_TOOL"));

  // featured=true
  const resFeatured = await request.get("/api/products?featured=true");
  expect(resFeatured.status()).toBe(200);
  const featuredJson = await resFeatured.json();
  expect(Array.isArray(featuredJson)).toBe(true);
  featuredJson.forEach((p: any) => {
    expect(p.isFeatured).toBe(true);
    expect(p.isActive).toBe(true);
  });

  // 2) GET /api/products/featured
  const resFeaturedOnly = await request.get("/api/products/featured");
  expect(resFeaturedOnly.status()).toBe(200);
  const featuredOnlyJson = await resFeaturedOnly.json();
  expect(Array.isArray(featuredOnlyJson)).toBe(true);
  featuredOnlyJson.forEach((p: any) => {
    expect(p.isFeatured).toBe(true);
    expect(p.isActive).toBe(true);
  });

  // 3) GET /api/products/[id]
  const firstId = (all[0] as any)?.id as string;
  expect(firstId).toBeTruthy();
  const resById = await request.get(`/api/products/${firstId}`);
  expect(resById.status()).toBe(200);
  const byIdJson = await resById.json();
  expect(byIdJson.id).toBe(firstId);
  expect(byIdJson.name).toBeTruthy();
  expect(byIdJson.slug).toBeTruthy();
  expect(byIdJson.description).toBeTruthy();

  // 4) GET /api/orders (auth required)
  const resOrdersNoAuth = await request.get("/api/orders");
  expect(resOrdersNoAuth.status()).toBe(401);

  // 5) POST /api/auth/register
  const registerPayload = { name: "Test User", email, password };

  const reg1 = await request.post("/api/auth/register", {
    data: registerPayload,
    headers: { "Content-Type": "application/json" },
  });
  expect(reg1.status()).toBe(201);
  const reg1Json = await reg1.json();
  expect(reg1Json?.user?.email || reg1Json?.user?.id).toBeTruthy();

  // duplicate email
  const regDup = await request.post("/api/auth/register", {
    data: registerPayload,
    headers: { "Content-Type": "application/json" },
  });
  expect(regDup.status()).toBeGreaterThanOrEqual(400);
  const regDupJson = await regDup.json();
  expect(regDupJson.error).toBeTruthy();

  // missing fields
  const regMissing = await request.post("/api/auth/register", {
    data: { email },
    headers: { "Content-Type": "application/json" },
  });
  expect(regMissing.status()).toBeGreaterThanOrEqual(400);
  const regMissingJson = await regMissing.json();
  expect(regMissingJson.error).toBeTruthy();

  // Login (UI) to obtain auth cookies
  await page.goto("/login");
  await page.getByPlaceholder("john@example.com").fill(email);
  await page.getByPlaceholder("••••••••").fill(password);
  await page.getByRole("button", { name: /sign in/i }).click();
  await page.waitForURL(/\/dashboard/);

  // Authenticated orders should work
  const resOrdersAuth = await page.request.get("/api/orders");
  expect(resOrdersAuth.status()).toBe(200);
  const ordersAuthJson = await resOrdersAuth.json();
  expect(Array.isArray(ordersAuthJson)).toBe(true);
  // New user should have no orders yet.
  expect(ordersAuthJson.length).toBe(0);
});

