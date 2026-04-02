const fs = require('fs');
const path = require('path');
const files = [
  'src/app/api/payments/webhook/route.ts',
  'src/app/api/payments/verify/route.ts',
  'src/app/api/payments/create-order/route.ts',
  'src/app/api/admin/users/route.ts',
  'src/app/api/auth/register/route.ts',
  'src/app/api/admin/products/route.ts',
  'src/app/api/admin/products/[id]/route.ts',
  'src/app/api/admin/orders/route.ts',
  'src/app/api/admin/orders/[id]/route.ts',
  'src/app/admin/page.tsx'
];
files.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/import prisma from ['"]@\/lib\/prisma['"];?/g, 'import { prisma } from "@/lib/prisma";');
    fs.writeFileSync(fullPath, content);
    console.log('Fixed', file);
  } catch (err) {
    console.log('Error fixing', file, err.message);
  }
});
