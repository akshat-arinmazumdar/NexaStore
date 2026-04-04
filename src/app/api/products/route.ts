export const dynamic = "force-dynamic"
export const revalidate = 0

export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");

    const whereClause: any = { isActive: true };
    
    if (category && category !== "ALL") {
      const normalized = category.toUpperCase();
      // Your tests pass `category=SAAS`, but the DB enum is `SAAS_TOOL`.
      whereClause.category =
        normalized === "SAAS" ? "SAAS_TOOL" : normalized;
    }
    
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (featured && (featured === "true" || featured === "1")) {
      whereClause.isFeatured = true;
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
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

    return NextResponse.json(products);
  } catch (error) {
    console.error("Products API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: body,
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Products API Error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

