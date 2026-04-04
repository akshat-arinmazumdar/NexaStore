import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  console.log("Current Products:");
  products.forEach(p => {
    console.log(`- ID: ${p.id}, Name: ${p.name}, Slug: ${p.slug}, isFeatured: ${p.isFeatured}`);
  });

  const targetName = "NexaStore Premium SaaS UI Kit";
  const fakeProduct = products.find(p => p.name === targetName);

  if (fakeProduct) {
    console.log(`Found fake product: ${fakeProduct.id}. Deleting associated reviews...`);
    await prisma.review.deleteMany({
      where: { productId: fakeProduct.id }
    });
    
    console.log("Deleting associated wishlist entries...");
    await prisma.wishlist.deleteMany({
      where: { productId: fakeProduct.id }
    });

    console.log("Deleting product...");
    await prisma.product.delete({
      where: { id: fakeProduct.id }
    });
    console.log("Product deleted successfully.");
  } else {
    console.log("No fake product found with that name.");
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
