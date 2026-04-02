import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.count();
  const products = await prisma.product.count();
  const orders = await prisma.order.count();
  const sessions = await prisma.session.count();

  console.log('Database Check:');
  console.log(`Users: ${users}`);
  console.log(`Products: ${products}`);
  console.log(`Orders: ${orders}`);
  console.log(`Sessions: ${sessions}`);

  if (products < 10) {
    console.error('ERROR: Missing products!');
    process.exit(1);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
