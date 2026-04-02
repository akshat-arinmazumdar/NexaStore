export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { OrderStatus } from "@prisma/client";
import { sendEmail } from "@/lib/email";
import { orderConfirmationEmail } from "@/lib/emails/orderConfirmation";
import { adminNewOrderEmail } from "@/lib/emails/adminNewOrder";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = await request.json();

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !orderId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Verify signature
    const text = razorpayOrderId + "|" + razorpayPaymentId;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest("hex");

    if (generated_signature !== razorpaySignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 2. Fetch order with items
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } }
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 3. Update order
    const updatedOrder = await (prisma.order.update({
      where: { id: orderId },
      data: {
        status: "COMPLETED" as any,
        paymentId: razorpayPaymentId,
        razorpayPaymentId,
        items: {
          updateMany: order.items.map((item) => ({
            where: { id: item.id },
            data: {
              price: item.product.price,
              accessLink: item.product.accessLink || "https://github.com/nexastore/digital-asset",
            },
          })),
        },
      } as any,
    }) as any);

    // Send Emails
    try {
      const productList = order.items.map(item => ({
        name: item.product.name,
        quantity: 1, // Digital products usually have quantity 1
        price: item.product.price
      }));

      // 1. Send Order Confirmation to User
      await sendEmail({
        to: session.user.email!,
        subject: "Order Confirmed! ✅",
        html: orderConfirmationEmail(order.id, productList, order.totalAmount, session.user.name || "Customer")
      });

      // 2. Send Admin Notification
      await sendEmail({
        to: "pocketmoneystudents@gmail.com", // Admin Email
        subject: "🔔 New Sale on NexaStore!",
        html: adminNewOrderEmail(order.id, session.user.name || "Customer", session.user.email!, productList, order.totalAmount)
      });
    } catch (emailError) {
      console.error("ORDER_EMAILS_ERROR", emailError);
    }

    return NextResponse.json({ success: true, orderId: updatedOrder.id });
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}

