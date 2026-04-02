import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();
  if (!user) {
    throw new Error("No user found in database; cannot seed session.");
  }

  // Create a single valid Session row so Phase 2 can verify "Sessions" has data.
  const token =
    "seed-" + Date.now() + "-" + Math.random().toString(16).slice(2);

  await prisma.session.create({
    data: {
      sessionToken: token,
      userId: user.id,
      expires: new Date(Date.now() + 3600_000),
    },
  });

  console.log("Seeded session for userId:", user.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

