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

    const productId = params.id

    // Remove from DB wishlist if exists
    await prisma.wishlist.deleteMany({
      where: { 
        userId: session.user.id,
        productId: productId
      }
    })

    return NextResponse.json({ success: true, message: "Removed from server wishlist" })

  } catch (error: any) {
    console.error("Wishlist Delete API Error:", error)
    return NextResponse.json({ 
      error: "Deletion failed: " + error.message 
    }, { status: 500 })
  }
}
