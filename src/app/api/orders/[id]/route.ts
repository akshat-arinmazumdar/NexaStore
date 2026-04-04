export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Please login" }, { status: 401 })
    }

    const orderId = params.id

    // Check if order belongs to user
    const order = await prisma.order.findUnique({
      where: { 
        id: orderId,
        userId: session.user.id
      }
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found or unauthorized" }, { status: 404 })
    }

    // Delete associated OrderItems first (since no cascade in schema)
    await prisma.orderItem.deleteMany({
      where: { orderId: orderId }
    })

    // Delete the Order
    await prisma.order.delete({
      where: { id: orderId }
    })

    return NextResponse.json({ success: true, message: "Order permanently deleted" })

  } catch (error: any) {
    console.error("Delete order error:", error)
    return NextResponse.json({ 
      error: "Deletion failed: " + error.message 
    }, { status: 500 })
  }
}
