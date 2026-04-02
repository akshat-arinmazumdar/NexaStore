export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'ALL';

    const whereClause: any = {};
    if (search) {
      whereClause.name = { contains: search, mode: "insensitive" };
    }
    if (category !== 'ALL') {
      whereClause.category = category;
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET admin products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    // Auto-generate slug if not provided or just from name
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: slug,
        description: data.description,
        price: Number(data.price),
        category: data.category as any,
        isActive: true,
        isFeatured: data.isFeatured || false,
        techStack: data.techStack || [],
        features: data.features || [],
        demoUrl: data.demoUrl || null,
        badge: data.badge || null,
        // using empty array for images if none provided
        images: data.images || [],
        longDesc: data.description || "",
        accessLink: data.accessLink || "",
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST admin products error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
