export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { amount, currency = "INR", productIds } = body;

    if (!amount || !productIds || !productIds.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Create order in Razorpay
    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // 2. Save order in database with PENDING status
    const order = await (prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount: amount,
        currency,
        status: "PENDING" as any,
        razorpayOrderId: razorpayOrder.id,
        paymentMethod: "RAZORPAY",
        items: {
          create: productIds.map((productId: string) => ({
            productId,
            price: 0,
            accessLink: "PENDING",
          })),
        },
      } as any,
    }) as any);

    return NextResponse.json({
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}

