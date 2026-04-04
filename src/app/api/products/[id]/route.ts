export const dynamic = "force-dynamic"
export const revalidate = 0

export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { id: params.id },
          { slug: params.id }
        ]
      },
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        description: true,
        longDesc: true,
        price: true,
        originalPrice: true,
        rating: true,
        totalReviews: true,
        images: true,
        isFeatured: true,
        isActive: true,
        techStack: true,
        features: true,
        whatYouGet: true,
        demoUrl: true,
        videoUrl: true,
      }
    })
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
