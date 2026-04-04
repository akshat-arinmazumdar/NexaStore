export const dynamic = "force-dynamic"
export const revalidate = 0

export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    
    console.log("RAZORPAY_KEY_ID:", key_id);
    console.log("RAZORPAY_KEY_SECRET exists:", !!key_secret);

    if (!key_id || !key_secret) {
      return NextResponse.json(
        { error: "Razorpay keys missing from configuration" },
        { status: 500 }
      );
    }

    const session = await auth();
    console.log("SESSION DEBUG:", JSON.stringify(session));

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: "Unauthorized - Please login first" },
        { status: 401 }
      );
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
  } catch (error: any) {
    console.error("Create Order Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to create payment order",
        details: error?.message || "Unknown error",
        stack: error?.stack 
      },
      { status: 500 }
    );
  }
}

