import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'pocketmoneystudents@gmail.com'
  const password = 'Admin@123'
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        role: 'ADMIN',
        password: hashedPassword
      },
      create: {
        email,
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN'
      }
    })
    console.log(`Admin user ${user.email} created/updated successfully with password: ${password}`)
  } catch (err) {
    console.error(err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
