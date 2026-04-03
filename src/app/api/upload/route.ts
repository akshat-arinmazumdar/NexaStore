export const dynamic = "force-dynamic"
export const revalidate = 0

export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { uploadImage } from "@/lib/cloudinary";

const rateLimitMap = new Map<string, { count: number, timestamp: number }>();
const LIMIT = 10;
const TIME_WINDOW = 60 * 1000; // 1 minute

export async function POST(req: Request) {
  try {
    const session = await auth();
    console.log("UPLOAD_API_SESSION:", session?.user?.email, "ROLE:", (session?.user as any)?.role);

    // Check if user is logged in and is an ADMIN
    if (!session || !session.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const now = Date.now();
    const rateData = rateLimitMap.get(ip) || { count: 0, timestamp: now };
    
    if (now - rateData.timestamp > TIME_WINDOW) {
      rateData.count = 1;
      rateData.timestamp = now;
    } else {
      rateData.count += 1;
    }
    
    rateLimitMap.set(ip, rateData);

    if (rateData.count > LIMIT) {
      return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to base64 for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Provide a fallback mimetype if file.type is missing (common edge-case)
    const mimeType = file.type || "image/jpeg";
    const fileBase64 = `data:${mimeType};base64,${buffer.toString("base64")}`;

    const result = await uploadImage(fileBase64);

    return NextResponse.json(result);
  } catch (error) {
    console.error("UPLOAD_ERROR_FULL:", JSON.stringify(error, null, 2));
    const errorMessage = (error as any)?.message || (error as any)?.error?.message || "Upload failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

