export const orderFailedEmail = (orderId: string, name: string) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Payment Failed</title>
          <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
              .header { text-align: center; margin-bottom: 30px; }
              .header h1 { color: #ef4444; margin: 0; font-size: 28px; }
              .content { line-height: 1.6; color: #374151; font-size: 16px; }
              .footer { text-align: center; margin-top: 40px; font-size: 14px; color: #9ca3af; }
              .button { display: inline-block; padding: 12px 24px; background-color: #ef4444; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 20px; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Payment Failed — Please try again</h1>
              </div>
              <div class="content">
                  <p>Hi ${name},</p>
                  <p>Unfortunately, your payment for order <strong>#${orderId}</strong> has failed. We're sorry about that.</p>
                  <p>Please try again or use a different payment method. If you need any assistance, feel free to contact our support team at <a href="mailto:pocketmoneystudents@gmail.com">pocketmoneystudents@gmail.com</a>.</p>
                  <div style="text-align: center;">
                      <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/cart" class="button">Retry Payment</a>
                  </div>
              </div>
              <div class="footer">
                  <p>© 2024 NexaStore. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;
  };
  
