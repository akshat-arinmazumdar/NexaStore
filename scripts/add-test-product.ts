import { prisma } from '../src/lib/prisma';

async function addProduct() {
  try {
    const product = await prisma.product.create({
      data: {
        name: "Manual Admin Product",
        slug: "manual-admin-product",
        description: "This is a real product added via admin logic (manual test).",
        price: 99.99,
        category: "SAAS_TOOL",
        isActive: true,
        images: ["https://res.cloudinary.com/dpcykwxin/image/upload/v1741000/nexastore/placeholder.png"],
        longDesc: "Full description of manually added admin product.",
        techStack: ["Next.js", "Prisma"],
        features: ["Manual Addition", "Live Database"],
        accessLink: "https://nexastore.in/download/manual-product"
      }
    });
    console.log("Product added successfully:", product.name);
  } catch (err) {
    console.error("Error adding product:", err);
  } finally {
    await prisma.$disconnect();
  }
}

addProduct();
