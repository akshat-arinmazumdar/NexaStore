export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { prisma } = await import("@/lib/prisma")
    const { getServerSession } = await import("next-auth")
    const { authOptions } = await import("@/lib/auth")
    
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const orders = await prisma.order.findMany({
      include: { user: true, items: true }
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
