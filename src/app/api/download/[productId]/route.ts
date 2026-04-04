export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

function convertToDirectDownload(url: string): string {
  // Convert Google Drive share link to direct download
  // https://drive.google.com/file/d/FILE_ID/view -> direct download
  const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (driveMatch) {
    return `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`
  }
  
  // Already direct link - return as is
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

    // Verify purchase
    const order = await prisma.order.findFirst({
      where: {
        userId: user.id,
        status: "COMPLETED",
        items: {
          some: { productId: params.productId }
        }
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
      return NextResponse.json({ error: "Download not available" }, { status: 404 })
    }

    // Convert to direct download URL
    const directUrl = convertToDirectDownload(product.downloadUrl)
    
    // Redirect directly to download
    return NextResponse.redirect(directUrl)
  } catch (error) {
    console.error("DOWNLOAD_ERROR", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
