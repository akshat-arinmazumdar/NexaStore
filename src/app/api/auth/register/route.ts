export const dynamic = "force-dynamic"
export const revalidate = 0

export const runtime = "nodejs";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { welcomeEmail } from "@/lib/emails/welcome";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER"
      },
    });

    // Send welcome email
    if (process.env.SENDGRID_API_KEY) {
      try {
        await sendEmail({
          to: user.email!,
          subject: "Welcome to NexaStore! 🎉",
          html: welcomeEmail(user.name!)
        });
      } catch (emailError) {
        console.error("WELCOME_EMAIL_ERROR", emailError);
        // Don't fail registration if email fails
      }
    }

    return NextResponse.json(
      { message: "User registered successfully", user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("REGISTRATION_ERROR", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
