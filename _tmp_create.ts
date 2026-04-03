import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testProductCreation() {
  const data = {
    name: "Test Admin Product",
    description: "Testing",
    price: 99,
    category: "SAAS_TOOL",
    techStack: ["React"],
    features: ["Feature"],
    images: ["https://res.cloudinary.com/dpcykwxin/image/upload/v1711000/nexastore/test.png"],
    accessLink: "https://google.com"
  };

  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug: slug,
      description: data.description,
      price: Number(data.price),
      category: data.category as any,
      isActive: true,
      isFeatured: false,
      techStack: data.techStack,
      features: data.features,
      demoUrl: null,
      badge: null,
      images: data.images || [],
      longDesc: data.description || "",
      accessLink: data.accessLink,
    },
  });

  console.log("Created:", product.images);

  const fetched = await prisma.product.findUnique({ where: { id: product.id } });
  console.log("Fetched:", fetched?.images);
}

testProductCreation().catch(console.error).finally(() => prisma.$disconnect());
