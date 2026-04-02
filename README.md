# 🚀 NexaStore — Premium Digital Marketplace

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Premium Digital Marketplace built with Next.js 14**

NexaStore is a high-performance, full-stack digital asset marketplace for modern commerce. Securely buy and sell premium digital products like source codes, AI models, and SaaS templates with automated delivery and integrated payments.

---

### 🔗 [Live Demo](https://nexastore-demo.vercel.app) *(Coming Soon)*

---

## ✨ Features

- **🎨 Premium UI/UX:** Stunning dark-themed aesthetics with glassmorphism and smooth Framer Motion animations.
- **🔐 Secure Authentication:** Integrated NextAuth v5 (Beta) with Google, GitHub, and Credentials support.
- **💳 Payment Integration:** Robust Razorpay integration for global and local (INR) payments with secure webhook verification.
- **📦 Automated Delivery:** Instant, secure access to digital downloads upon successful payment.
- **📧 Transactional Emails:** Automated welcome, order confirmation, and alert emails powered by SendGrid.
- **🖼️ Media Management:** Admin-only image uploads with progress tracking, previews, and secure hosting on Cloudinary.
- **🛡️ Admin Command Center:** Comprehensive analytics dashboard, user role management, and full product lifecycle control.
- **⚡ Performance First:** Optimized with Next.js Server Actions, edge-ready middleware, and Neon serverless PostgreSQL.

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS, Framer Motion, Lucide Icons, Zustand.
- **Backend:** Node.js, Next-Auth v5, Razorpay SDK, SendGrid SDK.
- **Database:** PostgreSQL (Neon DB), Prisma ORM.
- **Infrastructure:** Cloudinary (Media), Vercel (Hosting), GitHub Actions (CI/CD).

## 📸 Screenshots

- *Home Page Preview*
- *Product Listing & Filters*
- *Interactive Cart & Checkout*
- *Secure User Dashboard*
- *Admin Analytics & Product Management*

*(Visuals coming soon!)*

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL Database (e.g., Neon.tech) 
- Razorpay, Cloudinary, and SendGrid accounts

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/nexastore.git
   cd nexastore
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   Create a `.env` file in the root directory and add the required variables (see the Environment Variables section below).

4. **Initialize the database:**
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `RAZORPAY_WEBHOOK_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `SENDGRID_API_KEY`
- `EMAIL_FROM`

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more information.

---

Built with ❤️ by [Your Name](https://github.com/your-username)
