export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
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
    console.error("GET admin product error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    let updateData: any = { ...data };
    
    // Auto-generate slug if name is updated, or keep existing/updated slug
    if (data.name && !data.slug) {
      updateData.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    // Convert price to Int/Float if it was passed as string
    if (updateData.price) {
      updateData.price = Number(updateData.price);
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("PATCH admin product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Soft delete
    const product = await prisma.product.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("DELETE admin product error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
