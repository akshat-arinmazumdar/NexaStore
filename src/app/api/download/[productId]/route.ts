export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    // Check if user is logged in
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ 
        error: "Please login to download" 
      }, { status: 401 });
    }

    // Check if user has PAID for this product (Order status COMPLETED)
    const order = await prisma.order.findFirst({
      where: {
        userId: session.user.id,
        status: "COMPLETED",
        items: {
          some: {
            productId: params.productId
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json({ 
        error: "Purchase required to download" 
      }, { status: 403 });
    }

    // Get product download URL
    const product = await prisma.product.findUnique({
      where: { id: params.productId },
      select: { downloadUrl: true, name: true }
    });

    if (!product?.downloadUrl) {
      return NextResponse.json({ 
        error: "Download not available for this product" 
      }, { status: 404 });
    }

    // Log download (optional but good for tracking)
    console.log(`Download: User ${session.user.email} downloaded ${product.name}`);

    // Return secure download URL
    return NextResponse.json({ 
      downloadUrl: product.downloadUrl,
      productName: product.name
    });

  } catch (error) {
    console.error("Download API Error:", error);
    return NextResponse.json({ 
      error: "An unexpected server error occurred during download" 
    }, { status: 500 });
  }
}
