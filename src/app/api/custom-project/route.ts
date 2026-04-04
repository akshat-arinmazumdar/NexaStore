export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      email, 
      phone, 
      projectType, 
      budget, 
      description,
      timeline 
    } = body

    if (!name || !email || !description) {
      return NextResponse.json({ 
        error: "Name, email and description are required" 
      }, { status: 400 })
    }

    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      
      // Email to Admin
      await sgMail.send({
        to: "pocketmoneystudents@gmail.com",
        from: process.env.EMAIL_FROM!,
        replyTo: email,
        subject: `🔔 New Custom Project Request from ${name} — NexaStore`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ffffff; padding: 30px; border-radius: 15px;">
              
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #6366f1; margin: 0;">🚀 NexaStore</h1>
                <p style="color: #a5b4fc; margin: 5px 0;">New Custom Project Request</p>
              </div>

              <div style="background: #2d2d4e; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #6366f1;">
                <h2 style="color: #6366f1; margin: 0 0 15px 0;">👤 Customer Details</h2>
                <p style="margin: 8px 0;"><strong style="color: #a5b4fc;">Name:</strong> ${name}</p>
                <p style="margin: 8px 0;"><strong style="color: #a5b4fc;">Email:</strong> <a href="mailto:${email}" style="color: #6366f1;">${email}</a></p>
                <p style="margin: 8px 0;"><strong style="color: #a5b4fc;">Phone:</strong> ${phone || 'Not provided'}</p>
              </div>

              <div style="background: #2d2d4e; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #10b981;">
                <h2 style="color: #10b981; margin: 0 0 15px 0;">📋 Project Details</h2>
                <p style="margin: 8px 0;"><strong style="color: #a5b4fc;">Project Type:</strong> ${projectType || 'Not specified'}</p>
                <p style="margin: 8px 0;"><strong style="color: #a5b4fc;">Budget:</strong> ${budget || 'Not specified'}</p>
                <p style="margin: 8px 0;"><strong style="color: #a5b4fc;">Timeline:</strong> ${timeline || 'Not specified'}</p>
              </div>

              <div style="background: #2d2d4e; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
                <h2 style="color: #f59e0b; margin: 0 0 15px 0;">📝 Project Description</h2>
                <p style="line-height: 1.6; color: #e2e8f0;">${description}</p>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${email}" 
                   style="background: #6366f1; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                  Reply to Customer
                </a>
              </div>

              <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 20px;">
                This email was sent from NexaStore. Reply directly to contact ${name}.
              </p>
            </div>
          </body>
          </html>
        `
      })

      // Confirmation email to Customer
      await sgMail.send({
        to: email,
        from: process.env.EMAIL_FROM!,
        subject: `✅ We received your project request — NexaStore`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 0px;">
            <div style="max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ffffff; padding: 30px; border-radius: 15px;">
              
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #6366f1; margin: 0;">🚀 NexaStore</h1>
              </div>

              <h2 style="color: #10b981;">Hey ${name}! 👋</h2>
              <p style="color: #e2e8f0; line-height: 1.6;">
                Thank you for reaching out! We have received your custom project request and our team will review it shortly.
              </p>
              <p style="color: #e2e8f0; line-height: 1.6;">
                We typically respond within <strong style="color: #6366f1;">24-48 hours</strong>.
              </p>

              <div style="background: #2d2d4e; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3 style="color: #a5b4fc; margin: 0 0 10px 0;">Your Request Summary:</h3>
                <p style="margin: 5px 0; color: #e2e8f0;"><strong>Project Type:</strong> ${projectType || 'Custom Project'}</p>
                <p style="margin: 5px 0; color: #e2e8f0;"><strong>Budget:</strong> ${budget || 'To be discussed'}</p>
              </div>

              <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 20px;">
                © 2026 NexaStore. All rights reserved.
              </p>
            </div>
          </body>
          </html>
        `
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: "Request submitted successfully! We will contact you within 24-48 hours." 
    })

  } catch (error: any) {
    console.error("Custom project error stack:", error.stack);
    if (error.response) {
      console.error("SG Body:", JSON.stringify(error.response.body, null, 2));
    }
    return NextResponse.json({ 
      error: error.message || "Failed to submit request. Please try again." 
    }, { status: 500 })
  }
}
