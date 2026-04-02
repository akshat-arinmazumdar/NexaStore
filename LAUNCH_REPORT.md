# NexaStore Launch Report
## Live URL: [PENDING VERCEL DEPLOYMENT]

## Status Table
| Feature | Local | Live | Status |
|---------|-------|------|--------|
| Auth | ✅ | ❓ | Ready for live test |
| Products | ✅ | ❓ | 10 products seeded to Neon |
| Payments | ✅ | ❓ | Razorpay integrated |
| Emails | ✅ | ❓ | SendGrid configured |
| Images | ✅ | ❓ | Cloudinary upload component ready |
| Admin | ✅ | ❓ | Admin role check implemented |
| Deployment | — | ❓ | GitHub initialized, pending Vercel |

## Environment Variables Checklist
The following variables MUST be added to your Vercel Dashboard (Settings > Environment Variables).
**⚠️ Values are stored in your local `.env` file — do NOT share them publicly.**

| Variable Name | Description |
|---------------|-------------|
| `DATABASE_URL` | Neon PostgreSQL connection string (pooler) |
| `DIRECT_URL` | Neon PostgreSQL direct connection string |
| `NEXTAUTH_SECRET` | Random 32-char secret for NextAuth |
| `NEXTAUTH_URL` | Your Vercel app URL (e.g. https://nexastore.vercel.app) |
| `RAZORPAY_KEY_ID` | Razorpay Test/Live Key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay Key Secret |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Same as RAZORPAY_KEY_ID (public) |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API Key |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Same as CLOUDINARY_CLOUD_NAME (public) |
| `SENDGRID_API_KEY` | SendGrid API Key (starts with SG.) |
| `EMAIL_FROM` | Sender email, e.g. NexaStore <you@gmail.com> |

## Post Launch Steps
1. **Vercel Connect:**
   - Link your GitHub repo to Vercel.
   - Add the Env Variables listed above (values from your local `.env`).
   - Deploy.
2. **Admin Verification:**
   - Once live, sign up with your admin email.
   - Run this SQL on Neon Console to grant admin access:
     ```sql
     UPDATE "User" SET role = 'ADMIN' WHERE email = 'pocketmoneystudents@gmail.com';
     ```
3. **Webhook Update:**
   - Update Razorpay webhook to: `https://[your-vercel-domain]/api/payments/webhook`

## Final Checks
- [x] SendGrid initialization and utility created.
- [x] Welcome, Confirmation, Failure, and Admin email templates created.
- [x] Email logic integrated into API routes.
- [x] Cloudinary initialization and utility created.
- [x] Admin Image Upload API and Component implemented.
- [x] Product forms updated with modern upload experience.
- [x] Neon DB migrations applied and products seeded.
- [x] Git repository initialized and committed.
