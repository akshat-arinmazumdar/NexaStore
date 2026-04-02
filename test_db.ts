import prisma from "./src/lib/prisma";

async function test() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: "test@nexastore.com" },
    });
    if (user) {
      console.log("✅ User found in database:", JSON.stringify(user, null, 2));
    } else {
      console.log("❌ User NOT found in database.");
    }
  } catch (error) {
    console.error("❌ Error querying database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
