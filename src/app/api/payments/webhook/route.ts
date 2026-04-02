import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { OrderStatus } from "@prisma/client";
import { sendEmail } from "@/lib/email";
import { orderFailedEmail } from "@/lib/emails/orderFailed";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const body = JSON.parse(rawBody);
    const event = body.event;
    const payment = body.payload.payment.entity;
    const razorpayOrderId = payment.order_id;

    if (event === "payment.captured") {
      // Find and update the order
      await prisma.order.update({
        where: { razorpayOrderId } as any,
        data: {
          status: "COMPLETED" as any,
          paymentId: payment.id,
          razorpayPaymentId: payment.id,
        } as any,
      });
    } else if (event === "payment.failed") {
      const order = await prisma.order.update({
        where: { razorpayOrderId } as any,
        data: {
          status: "FAILED" as any,
        } as any,
        include: { user: true }
      });

      if (order.user && order.user.email) {
        try {
          await sendEmail({
            to: order.user.email,
            subject: "Payment Failed — Please try again",
            html: orderFailedEmail(order.id, order.user.name || "Customer")
          });
        } catch (emailError) {
          console.error("FAILURE_EMAIL_ERROR", emailError);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Webhook process failed" },
      { status: 500 }
    );
  }
}
