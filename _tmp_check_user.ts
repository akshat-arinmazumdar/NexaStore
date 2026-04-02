import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "testuser@test.com";
  const user = await prisma.user.findUnique({ where: { email } });
  console.log(user ? `EXISTS:${user.id}` : "NOT_FOUND");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

