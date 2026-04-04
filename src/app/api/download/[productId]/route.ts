export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

function getDirectDownloadUrl(url: string): string {
  const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (driveMatch) {
    // Note: confirm=t is needed for large files for direct download
    return `https://drive.google.com/uc?export=download&confirm=t&id=${driveMatch[1]}`
  }
  return url
}

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Please login" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const order = await prisma.order.findFirst({
      where: {
        userId: user.id,
        status: "COMPLETED",
        items: { some: { productId: params.productId } }
      }
    })

    if (!order) {
      return NextResponse.json({ error: "Purchase required" }, { status: 403 })
    }

    const product = await prisma.product.findUnique({
      where: { id: params.productId },
      select: { downloadUrl: true, name: true }
    })

    if (!product?.downloadUrl) {
      return NextResponse.json({ error: "No download available" }, { status: 404 })
    }

    const directUrl = getDirectDownloadUrl(product.downloadUrl)

    return NextResponse.json({ 
      success: true,
      downloadUrl: directUrl,
      filename: product.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.zip'
    })

  } catch (error: any) {
    console.error("Download error:", error)
    return NextResponse.json({ 
      error: "Download failed: " + error.message 
    }, { status: 500 })
  }
}
