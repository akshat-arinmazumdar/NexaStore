import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function runTests() {
  console.log("Running Backend API Tests...");

  // 1. GET /api/products
  let res = await fetch("http://localhost:3000/api/products");
  let json = await res.json();
  console.log("GET /api/products:", json.length === 10 ? "PASS" : "FAIL - " + json.length);

  // 2. GET /api/products?search=saas
  res = await fetch("http://localhost:3000/api/products?search=saas");
  json = await res.json();
  console.log("GET /api/products?search=saas:", Array.isArray(json) && json.length > 0 ? "PASS" : "FAIL");

  // 3. GET /api/products/featured
  res = await fetch("http://localhost:3000/api/products/featured");
  json = await res.json();
  console.log("GET /api/products/featured:", Array.isArray(json) && json.length > 0 ? "PASS" : "FAIL");

  // 4. GET /api/products/[slug]
  res = await fetch("http://localhost:3000/api/products/saas-billing-starter");
  json = await res.json();
  console.log("GET /api/products/[id] slug:", json?.slug === "saas-billing-starter" ? "PASS" : "FAIL");

  // 5. GET /api/orders
  res = await fetch("http://localhost:3000/api/orders");
  console.log("GET /api/orders (no auth):", res.status === 401 ? "PASS" : `FAIL (${res.status})`);

  console.log("\nReviewing Database State directly:");
  const users = await prisma.user.count();
  console.log(`Users in DB: ${users}`);
}

runTests().catch(console.error).finally(() => {
  prisma.$disconnect();
  process.exit(0);
});
