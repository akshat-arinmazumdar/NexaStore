export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.string(),
  stock: z.coerce.number().int().positive("Stock must be a positive integer").optional(),
  techStack: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  demoUrl: z.string().optional().nullable(),
  badge: z.string().optional().nullable(),
  isFeatured: z.boolean().optional(),
  accessLink: z.string().optional(),
  downloadUrl: z.string().min(1, "Download URL is required")
});

export async function GET(req: NextRequest) {
  try {
    const { prisma } = await import("@/lib/prisma")
    const { auth } = await import("@/auth")
    
    const session = await auth()
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
    const { auth } = await import("@/auth")
    
    const session = await auth()
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rawData = await req.json();
    
    // Zod validation
    const validationResult = productSchema.safeParse(rawData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed", details: fieldErrors },
        { status: 400 }
      );
    }
    
    const data = validationResult.data;
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: slug,
        description: data.description,
        price: data.price,
        category: data.category as any,
        isActive: true,
        isFeatured: data.isFeatured || false,
        techStack: data.techStack || [],
        features: data.features || [],
        demoUrl: data.demoUrl || null,
        badge: data.badge || null,
        images: data.images,
        longDesc: data.description || "",
        accessLink: data.accessLink || "",
        downloadUrl: data.downloadUrl || "",
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Product Create Error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
