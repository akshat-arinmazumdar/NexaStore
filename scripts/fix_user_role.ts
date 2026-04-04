import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "akshat.muzumbaraiml2023@indoreinstitute.com";
  
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log(`User ${email} not found.`);
    return;
  }

  await prisma.user.update({
    where: { email },
    data: { role: "USER" },
  });

  console.log(`Successfully updated ${email} to USER role.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
