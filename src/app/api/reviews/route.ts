import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// GET REVIEWS (PRODUCT SPECIFIC OR ALL FOR ADMIN)
export async function GET(req: Request) {
  try {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
    const isAdminRequest = searchParams.get("admin") === "true";

    // ADMIN FETCH ALL REVIEWS
    if (isAdminRequest) {
      if ((session?.user as any)?.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const reviews = await prisma.review.findMany({
        include: {
          user: { select: { name: true, email: true, image: true } },
          product: { select: { name: true } }
        },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(reviews);
    }

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST A NEW REVIEW
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, rating, comment } = await req.json();

    // Validation
    if (!productId || !rating || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    // Check if user already reviewed
    const existingReview = await prisma.review.findFirst({
      where: {
        productId,
        userId: session.user.id,
      },
    });

    if (existingReview) {
      return NextResponse.json({ error: "You have already reviewed this product" }, { status: 400 });
    }

    // CHECK IF USER HAS PURCHASED PRODUCT
    const orderItem = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          userId: session.user.id,
          status: "COMPLETED",
        },
      },
    });

    if (!orderItem) {
      return NextResponse.json({ error: "You must purchase the product to leave a review" }, { status: 403 });
    }

    // Create Review
    const review = await prisma.review.create({
      data: {
        productId,
        userId: session.user.id,
        rating,
        comment,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    // Update Product average rating and count
    const allReviews = await prisma.review.findMany({
      where: { productId },
      select: { rating: true },
    });

    const totalReviews = allReviews.length;
    const avgRating = allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / totalReviews;

    await prisma.product.update({
      where: { id: productId },
      data: {
        totalReviews,
        rating: avgRating,
      },
    });

    return NextResponse.json(review);
  } catch (error: any) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
