export const dynamic = "force-dynamic"
export const revalidate = 0

export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const featuredProducts = await prisma.product.findMany({
      where: {
        isFeatured: true,
        isActive: true,
      },
      take: 6,
      orderBy: {
        totalSales: "desc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        description: true,
        price: true,
        originalPrice: true,
        rating: true,
        totalReviews: true,
        images: true,
        isFeatured: true,
        isActive: true,
      }
    });

    return NextResponse.json(featuredProducts);
  } catch (error) {
    console.error("Featured Products API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured products" },
      { status: 500 }
    );
  }
}

