export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { prisma } = await import("@/lib/prisma")
    const { getServerSession } = await import("next-auth")
    const { authOptions } = await import("@/lib/auth")
    
    const session = await getServerSession(authOptions)
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
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { prisma } = await import("@/lib/prisma")
    const { getServerSession } = await import("next-auth")
    const { authOptions } = await import("@/lib/auth")
    
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
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
        images: data.images || [],
        longDesc: data.description || "",
        accessLink: data.accessLink || "",
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
