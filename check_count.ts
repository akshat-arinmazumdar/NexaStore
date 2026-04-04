import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function check() {
  const count = await prisma.product.count();
  console.log(`Total products: ${count}`);
}

check()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
