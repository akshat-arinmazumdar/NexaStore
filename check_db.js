const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkProducts() {
  const count = await prisma.product.count();
  console.log(`Product Count: ${count}`);
  const tables = ['User', 'Product', 'Order', 'OrderItem', 'Wishlist', 'Review', 'Session', 'Account'];
  for (const table of tables) {
      try {
          const tCount = await prisma[table.toLowerCase()].count();
          console.log(`${table} Count: ${tCount}`);
      } catch (e) {
          console.log(`${table}: Error or missing`);
      }
  }
}

checkProducts().finally(() => prisma.$disconnect());
