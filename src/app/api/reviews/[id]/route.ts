import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ADMIN ONLY - REPLY TO A REVIEW
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    
    // Check if user is Admin
    const userRole = (session?.user as any)?.role;
    if (userRole !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { adminReply } = await req.json();

    if (!adminReply) {
      return NextResponse.json({ error: "Reply comment is required" }, { status: 400 });
    }

    const review = await prisma.review.update({
      where: { id: params.id },
      data: {
        adminReply,
        repliedAt: new Date(),
      },
    });

    return NextResponse.json(review);
  } catch (error: any) {
    console.error("Error replying to review:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ADMIN ONLY - DELETE A REVIEW
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    
    const userRole = (session?.user as any)?.role;
    if (userRole !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const review = await prisma.review.findUnique({
      where: { id: params.id }
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    const productId = review.productId;

    await prisma.review.delete({
      where: { id: params.id },
    });

    // Update Product average rating and count after deletion
    const allReviews = await prisma.review.findMany({
      where: { productId },
      select: { rating: true },
    });

    const totalReviews = allReviews.length;
    const avgRating = totalReviews > 0 
      ? allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / totalReviews 
      : 0;

    await prisma.product.update({
      where: { id: productId },
      data: {
        totalReviews,
        rating: avgRating,
      },
    });

    return NextResponse.json({ success: true, message: "Review deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
