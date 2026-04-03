import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const email = 'pocketmoneystudents@gmail.com'
  const user = await prisma.user.findUnique({ where: { email } })
  if (user) {
    console.log(`User: ${user.email}, Role: ${user.role}, RoleType: ${typeof user.role}`)
  } else {
    console.log('User not found')
  }
  await prisma.$disconnect()
}
main()
