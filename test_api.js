const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testApi() {
  const baseUrl = "http://localhost:3000";

  console.log("--- Phase 5: API Tests ---");

  // 1. GET /api/products
  try {
    const res = await fetch(`${baseUrl}/api/products`);
    const data = await res.json();
    console.log(`1. GET /api/products: ${res.status}, Count: ${data.length}`);
    if (data.length === 10) console.log("✅ Returns 10 products"); else console.log("❌ Unexpected count");
  } catch (e) { console.log(`1. Error: ${e.message}`); }

  // 1b. Search/Category filter
  try {
    const res = await fetch(`${baseUrl}/api/products?search=saas`);
    const data = await res.json();
    console.log(`- Search 'saas': Found ${data.length} products`);
  } catch (e) {
      console.log(`- Search Error: ${e.message}`);
  }

  // 2. GET /api/products/featured
  try {
    const res = await fetch(`${baseUrl}/api/products/featured`);
    const data = await res.json();
    console.log(`2. GET /api/products/featured: ${res.status}, Featured: ${data.length}`);
  } catch (e) { console.log(`2. Error: ${e.message}`); }

  // 4. POST /api/auth/register
  console.log("\n4. POST /api/auth/register (Phase 3.1)");
  try {
    const res = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "QA Test",
        email: `qa_${Date.now()}@test.com`, // Use unique email
        password: "QA@1234"
      })
    });
    console.log(`Register: ${res.status}`);
  } catch (e) { console.log(`Register Error: ${e.message}`); }

  // 5. GET /api/orders (Protected)
  console.log("\n5. GET /api/orders (Protected Phase 5.5)");
  try {
    const res = await fetch(`${baseUrl}/api/orders`);
    console.log(`GET /api/orders (unauthenticated): ${res.status} (Expected 401)`);
  } catch (e) { console.log(`GET /api/orders Error: ${e.message}`); }

}

testApi().finally(() => prisma.$disconnect());
