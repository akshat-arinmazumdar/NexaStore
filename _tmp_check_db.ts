import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  try {
    const userCount = await prisma.user.count()
    const productCount = await prisma.product.count()
    const orderCount = await prisma.order.count()
    const orderItemCount = await prisma.orderItem.count()
    const sessionCount = await prisma.session.count()
    console.log(`Users: ${userCount}`)
    console.log(`Products: ${productCount}`)
    console.log(`Orders: ${orderCount}`)
    console.log(`OrderItems: ${orderItemCount}`)
    console.log(`Sessions: ${sessionCount}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}
main()
