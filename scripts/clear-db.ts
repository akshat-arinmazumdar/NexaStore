import { prisma } from '../src/lib/prisma';

async function clearProducts() {
  try {
    await prisma.product.deleteMany();
    console.log("All products deleted from the database.");
  } catch (err) {
    console.error("Error deleting products:", err);
  } finally {
    await prisma.$disconnect();
  }
}

clearProducts();
