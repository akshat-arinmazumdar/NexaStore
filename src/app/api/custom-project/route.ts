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
        text: `New Custom Project Request from ${name}.\nEmail: ${email}\nPhone: ${phone}\nProject Type: ${projectType}\nBudget: ${budget}\nTimeline: ${timeline}\nDescription: ${description}`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ffffff; padding: 30px; border-radius: 15px;">
              <h1 style="color: #6366f1; text-align: center;">NexaStore</h1>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
              <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
              <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
              <p><strong>Description:</strong> ${description}</p>
            </div>
          </body>
          </html>
        `,
        headers: {
          'List-Unsubscribe': `<mailto:support@nexastore.com?subject=unsubscribe>`,
          'X-Priority': '1',
          'Importance': 'high'
        }
      })

      // Confirmation email to Customer
      await sgMail.send({
        to: email,
        from: process.env.EMAIL_FROM!,
        subject: `✅ We received your project request — NexaStore`,
        text: `Hey ${name}! We received your custom project request. We typically respond within 24-48 hours.`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ffffff; padding: 30px; border-radius: 15px;">
              <h1 style="color: #6366f1; text-align: center;">NexaStore</h1>
              <h2>Hey ${name}! 👋</h2>
              <p>We received your custom project request. We typically respond within 24-48 hours.</p>
              <p>© 2026 NexaStore. All rights reserved.</p>
            </div>
          </body>
          </html>
        `,
        headers: {
          'List-Unsubscribe': `<mailto:support@nexastore.com?subject=unsubscribe>`,
          'X-Priority': '1',
          'Importance': 'high'
        }
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
