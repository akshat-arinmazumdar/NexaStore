export const orderConfirmationEmail = (orderId: string, products: any[], totalAmount: number, name: string) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmed</title>
          <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
              .header { text-align: center; margin-bottom: 30px; }
              .header h1 { color: #10b981; margin: 0; font-size: 28px; }
              .content { line-height: 1.6; color: #374151; font-size: 16px; }
              .order-details { margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; background-color: #f9fafb; }
              .product-list { width: 100%; border-collapse: collapse; }
              .product-list th, .product-list td { text-align: left; padding: 8px; border-bottom: 1px solid #e5e7eb; }
              .footer { text-align: center; margin-top: 40px; font-size: 14px; color: #9ca3af; }
              .button { display: inline-block; padding: 12px 24px; background-color: #10b981; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 20px; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Order Confirmed! ✅</h1>
              </div>
              <div class="content">
                  <p>Hi ${name},</p>
                  <p>Thank you for shopping with NexaStore! Your order has been successfully placed. Your order ID is <strong>#${orderId}</strong>.</p>
                  
                  <div class="order-details">
                      <h3>Order Summary:</h3>
                      <table class="product-list">
                          <thead>
                              <tr>
                                  <th>Product</th>
                                  <th>Quantity</th>
                                  <th>Price</th>
                              </tr>
                          </thead>
                          <tbody>
                              ${products.map(product => `
                                  <tr>
                                      <td>${product.name}</td>
                                      <td>${product.quantity}</td>
                                      <td>₹${product.price}</td>
                                  </tr>
                              `).join('')}
                          </tbody>
                          <tfoot>
                              <tr>
                                  <td colspan="2"><strong>Total Amount:</strong></td>
                                  <td><strong>₹${totalAmount}</strong></td>
                              </tr>
                          </tfoot>
                      </table>
                  </div>
                  
                  <p>You can access your digital products and view your order history directly from your dashboard.</p>
                  <div style="text-align: center;">
                      <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard" class="button">Go to Dashboard</a>
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
  
