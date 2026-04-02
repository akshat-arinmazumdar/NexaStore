import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const productCount = await prisma.product.count();
  const userCount = await prisma.user.count();
  const orderCount = await prisma.order.count();
  const products = await prisma.product.findMany();
  
  console.log({
    productCount,
    userCount,
    orderCount,
    products: products.map(p => ({ id: p.id, name: p.name, slug: p.slug }))
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
