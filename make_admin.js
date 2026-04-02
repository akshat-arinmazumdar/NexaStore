const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function makeAdmin() {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      console.log("No users found.");
      return;
    }
    
    await prisma.user.update({
      where: { id: user.id },
      data: { role: 'ADMIN' }
    });
    console.log(`Successfully made user ${user.email} an ADMIN`);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

makeAdmin();
