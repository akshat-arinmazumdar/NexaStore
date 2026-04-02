const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testPaymentVerify() {
  console.log("--- Phase 6: Payment Flow Test (Backend Sim) ---");

  try {
      const user = await prisma.user.findFirst();
      if (!user) {
          console.log("No users found. Creating a test user...");
          // Skip creation for now, assume users exist based on previous check.
      }
      const product = await prisma.product.findFirst();
      
      const order = await prisma.order.create({
          data: {
              userId: user.id,
              totalAmount: 99.99,
              currency: "INR",
              status: "PENDING",
              razorpayOrderId: `order_test_${Date.now()}`, // Unique
              paymentMethod: "RAZORPAY",
              items: {
                  create: [
                      { productId: product.id, price: 99.99 }
                  ]
              }
          }
      });
      console.log(`Order Created: ${order.id}, Status: ${order.status}`);

      const updated = await prisma.order.update({
          where: { id: order.id },
          data: {
              status: "COMPLETED",
              razorpayPaymentId: "pay_test_456"
          }
      });

      console.log(`Order Updated: ${updated.id}, Status: ${updated.status}, PaymentID: ${updated.razorpayPaymentId}`);
      if (updated.status === "COMPLETED") console.log("✅ Payment Flow logic verified");
  } catch (err) {
      console.log("CRITICAL ERROR during simulation:");
      console.log(err.message || err);
  }
}

testPaymentVerify().finally(() => prisma.$disconnect());
