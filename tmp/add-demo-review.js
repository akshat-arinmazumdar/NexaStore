const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ take: 1 });
  const product = await prisma.product.findUnique({ where: { slug: "nexastore-premium-saas-ui" } });
  
  if (users.length > 0 && product) {
    const review = {
      userId: users[0].id,
      productId: product.id,
      rating: 5,
      comment: "Absolutely amazing UI kit! The components are clean and the dark mode support is top-notch. Highly Recommended!",
      adminReply: "Thank you for your feedback! We're glad you liked the UI kit.",
      repliedAt: new Date()
    };

    console.log("Adding one demo review...");
    await prisma.review.create({ data: review });
    console.log("Review added!");
  } else {
    console.log("Need a user to add a review. Please register first or add a test user.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
