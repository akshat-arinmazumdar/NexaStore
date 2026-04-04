export const dynamic = "force-dynamic"

export default function RefundPolicy() {
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
        <h1 style={{ color: "#6366f1", fontSize: "3rem", fontWeight: "bold" }}>Refund Policy</h1>
        <p style={{ color: "#6b7280", marginBottom: "40px" }}>Last Updated: April 2026</p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <section style={{ 
            background: "#1a1a2e", 
            padding: "25px", 
            borderRadius: "12px",
            border: "1px solid #2d2d4e" 
          }}>
            <h2 style={{ color: "#6366f1", marginBottom: "15px" }}>1. No Refund Policy</h2>
            <p style={{ lineHeight: "1.6" }}>
              NexaStore specializing in digital products that are non-tangible and irrevocable once accessed. 
              <strong>All digital products are non-refundable</strong>. Once you have downloaded or 
              accessed a product, no refund will be issued.
            </p>
          </section>

          <section style={{ 
            background: "#1a1a2e", 
            padding: "25px", 
            borderRadius: "12px",
            border: "1px solid #2d2d4e" 
          }}>
            <h2 style={{ color: "#6366f1", marginBottom: "15px" }}>2. Exceptions</h2>
            <p style={{ lineHeight: "1.6" }}>
              Refunds may be considered under the following limited circumstances:
              <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
                <li>Product is completely broken or does not function at all.</li>
                <li>Wrong product was delivered.</li>
                <li>Duplicate payment was made due to technical error.</li>
              </ul>
            </p>
          </section>

          <section style={{ 
            background: "#1a1a2e", 
            padding: "25px", 
            borderRadius: "12px",
            border: "1px solid #2d2d4e" 
          }}>
            <h2 style={{ color: "#6366f1", marginBottom: "15px" }}>3. How to Request</h2>
            <p style={{ lineHeight: "1.6" }}>
              To request a refund under the above exceptions, please email:
              <strong style={{ display: "block", color: "#6366f1", marginTop: "10px" }}>pocketmoneystudents@gmail.com</strong>
              <br />
              Please include your <strong>Order ID</strong> and a detailed explanation of your request. 
              We typically respond within <strong>48 hours</strong>.
            </p>
          </section>

          <section style={{ 
            background: "#1a1a2e", 
            padding: "25px", 
            borderRadius: "12px",
            border: "1px solid #2d2d4e" 
          }}>
            <h2 style={{ color: "#6366f1", marginBottom: "15px" }}>4. Resolution</h2>
            <p style={{ lineHeight: "1.6" }}>
              Refund requests are resolved on a <strong>case-by-case basis</strong>. Depending on the situation, 
              we may issue a replacement product, store credit, or a refund to the original payment method.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
