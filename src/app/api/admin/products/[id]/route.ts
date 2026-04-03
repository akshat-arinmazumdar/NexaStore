export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { prisma } = await import("@/lib/prisma")
    const { getServerSession } = await import("next-auth")
    const { authOptions } = await import("@/lib/auth")
    
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { prisma } = await import("@/lib/prisma")
    const { getServerSession } = await import("next-auth")
    const { authOptions } = await import("@/lib/auth")
    
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    let updateData: any = { ...data };
    
    if (data.name && !data.slug) {
      updateData.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    if (updateData.price) {
      updateData.price = Number(updateData.price);
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { prisma } = await import("@/lib/prisma")
    const { getServerSession } = await import("next-auth")
    const { authOptions } = await import("@/lib/auth")
    
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
