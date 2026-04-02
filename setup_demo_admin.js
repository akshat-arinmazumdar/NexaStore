const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function resetAdminPassword() {
  try {
    const adminEmail = 'test@nexastore.com';
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    // Upsert to make sure we definitely have an admin user we know the credentials for
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: { 
        password: hashedPassword,
        role: 'ADMIN'
      },
      create: {
        name: 'Admin Demo',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN'
      }
    });
    console.log(`Password reset for ${adminEmail}`);
  } catch (err) {
    console.error("Error setting up demo user:", err);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdminPassword();
