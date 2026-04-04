export const dynamic = "force-dynamic"

export default function PrivacyPolicy() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0f1a",
      color: "#e2e8f0",
      padding: "120px 20px 80px"
    }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto"
      }}>
        <h1 style={{ 
          color: "#6366f1", 
          fontSize: "3rem", 
          marginBottom: "10px",
          fontWeight: "bold" 
        }}>Privacy Policy</h1>
        <p style={{ color: "#6b7280", marginBottom: "40px" }}>Last Updated: April 2026</p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <section style={{ 
            background: "#1a1a2e", 
            padding: "25px", 
            borderRadius: "12px",
            border: "1px solid #2d2d4e" 
          }}>
            <h2 style={{ color: "#6366f1", marginBottom: "15px" }}>1. Information We Collect</h2>
            <p style={{ lineHeight: "1.6" }}>
              We collect information you provide directly to us, including your name, email address, and payment information. 
              We also collect usage data and use cookies to enhance your experience on NexaStore.
            </p>
          </section>

          <section style={{ 
            background: "#1a1a2e", 
            padding: "25px", 
            borderRadius: "12px",
            border: "1px solid #2d2d4e" 
          }}>
            <h2 style={{ color: "#6366f1", marginBottom: "15px" }}>2. How We Use Information</h2>
            <p style={{ lineHeight: "1.6" }}>
              We use the collected information to:
              <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
                <li>Process payments securely via <strong>Razorpay</strong>.</li>
                <li>Send transactional emails and updates via <strong>SendGrid</strong>.</li>
                <li>Manage and store product images via <strong>Cloudinary</strong>.</li>
              </ul>
            </p>
          </section>

          <section style={{ 
            background: "#1a1a2e", 
            padding: "25px", 
            borderRadius: "12px",
            border: "1px solid #2d2d4e" 
          }}>
            <h2 style={{ color: "#6366f1", marginBottom: "15px" }}>3. Data Security</h2>
            <p style={{ lineHeight: "1.6" }}>
              NexaStore prioritizes your security. All user passwords are encrypted using industry-standard hashing algorithms, 
              and all payment processing is handled through secure, PCI-compliant gateways.
            </p>
          </section>

          <section style={{ 
            background: "#1a1a2e", 
            padding: "25px", 
            borderRadius: "12px",
            border: "1px solid #2d2d4e" 
          }}>
            <h2 style={{ color: "#6366f1", marginBottom: "15px" }}>4. Cookies</h2>
            <p style={{ lineHeight: "1.6" }}>
              We use both session cookies (which expire once you close your web browser) and persistent cookies 
              (which stay on your computer until you delete them) to provide you with a more personal and interactive experience.
            </p>
          </section>

          <section style={{ 
            background: "#1a1a2e", 
            padding: "25px", 
            borderRadius: "12px",
            border: "1px solid #2d2d4e" 
          }}>
            <h2 style={{ color: "#6366f1", marginBottom: "15px" }}>5. Third Party Services</h2>
            <p style={{ lineHeight: "1.6" }}>
              To provide a world-class experience, we integrate with:
              <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
                <li><strong>Razorpay</strong>: Secure Payment Processing</li>
                <li><strong>SendGrid</strong>: Reliable Email Delivery</li>
                <li><strong>Cloudinary</strong>: Optimized Asset Management</li>
                <li><strong>Neon</strong>: Scalable PostgreSQL Database</li>
              </ul>
            </p>
          </section>

          <section style={{ 
            background: "#1a1a2e", 
            padding: "25px", 
            borderRadius: "12px",
            border: "1px solid #2d2d4e" 
          }}>
            <h2 style={{ color: "#6366f1", marginBottom: "15px" }}>6. User Rights</h2>
            <p style={{ lineHeight: "1.6" }}>
              You have the right to access your data, request corrections, or delete your account entirely. 
              Please contact us if you wish to exercise any of these rights.
            </p>
          </section>

          <section style={{ 
            background: "#1a1a2e", 
            padding: "25px", 
            borderRadius: "12px",
            border: "1px solid #2d2d4e" 
          }}>
            <h2 style={{ color: "#6366f1", marginBottom: "15px" }}>7. Contact Information</h2>
            <p style={{ lineHeight: "1.6" }}>
              If you have any questions about this Privacy Policy, you can reach us at:
              <br />
              <strong style={{ color: "#6366f1" }}>pocketmoneystudents@gmail.com</strong>
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
