export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth"; // Assuming standard next-auth v5 setup or fallback to getting session

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // NextAuth integration to get current user
    const session = await auth();
    
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Orders GET API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { items, totalAmount, paymentMethod, paymentId } = body;

    if (!items || !items.length || typeof totalAmount !== "number") {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400 }
      );
    }

    const order = await (prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount,
        paymentMethod: paymentMethod || "CARD",
        paymentId,
        status: "COMPLETED" as any,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            price: item.price,
            accessLink: item.accessLink || "https://github.com/nexastore/digital-asset", // Provide a default or actual link
          })),
        },
      } as any,
      include: {
        items: true,
      },
    }) as any);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Orders POST API Error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

