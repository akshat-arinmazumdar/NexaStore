export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import Razorpay from "razorpay"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    console.log("=== CREATE ORDER START ===")
    
    const session = await auth()
    console.log("Session:", session?.user?.email)
    
    if (!session?.user?.email || !session?.user?.id) {
      return NextResponse.json({ error: "Please login first" }, { status: 401 })
    }

    const body = await request.json()
    console.log("Request body:", body)
    
    const { amount, productIds } = body
    
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    
    if (!keyId || !keySecret) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 500 })
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    })

    const amountInPaise = Math.round(amount * 100)
    console.log("Amount in paise:", amountInPaise)

    // 1. Create order in Razorpay
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        productIds: JSON.stringify(productIds || []),
        userEmail: session.user.email,
      }
    })
    
    console.log("Razorpay order created:", razorpayOrder.id)

    // 2. Create order in database
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount: amount,
        currency: "INR",
        status: "PENDING",
        razorpayOrderId: razorpayOrder.id,
        paymentMethod: "RAZORPAY",
        items: {
          create: productIds.map((productId: string) => ({
            productId,
            price: 0, // Will be updated on verification
            accessLink: "PENDING",
          })),
        },
      }
    })

    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id, // Razorpay Order ID for modal
      dbOrderId: order.id,       // Internal DB Order ID for verification
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: keyId,
    })

  } catch (error: any) {
    console.error("=== CREATE ORDER ERROR ===")
    console.error("Error message:", error.message)
    console.error("Error details:", JSON.stringify(error))
    
    return NextResponse.json({ 
      error: "Failed to create payment order",
      details: error.message
    }, { status: 500 })
  }
}
