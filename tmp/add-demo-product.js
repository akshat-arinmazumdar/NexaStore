const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const product = {
    name: "NexaStore Premium SaaS UI Kit",
    slug: "nexastore-premium-saas-ui",
    description: "The ultimate UI kit for modern SaaS applications built with Next.js 14.",
    longDesc: "Elevate your design game with the Nexatore Premium SaaS UI Kit. Includes over 50+ handcrafted components, full dark mode support, and seamless Framer Motion animations.",
    category: "SAAS_TOOL",
    price: 4999,
    originalPrice: 9999,
    images: ["https://res.cloudinary.com/dz6pa3quv/image/upload/v1712217600/demo-1.jpg"],
    features: ["50+ Components", "Next.js & Tailwind Ready", "Dark Mode Support", "Fully Responsive"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    whatYouGet: ["Design Files (Figma)", "Source Code (Next.js)", "Future Updates"],
    accessLink: "https://github.com/nexastore/premium-saas",
    isFeatured: true,
    isActive: true,
    rating: 4.8,
    totalSales: 42,
    totalReviews: 5
  };

  console.log("Adding one real-looking product for demo...");
  await prisma.product.upsert({
    where: { slug: product.slug },
    update: product,
    create: product,
  });
  console.log("Product added!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
