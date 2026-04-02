const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testRegistration() {
  console.log("Testing Registration API...");
  try {
    const res = await axios.post('http://localhost:3000/api/auth/register', {
      name: "QA Test",
      email: "qa@test.com",
      password: "QA@1234"
    });
    console.log("Response:", res.status, res.data);
  } catch (e) {
    console.log("Error:", e.response ? e.response.status : e.message, e.response ? e.response.data : "");
  }

  const user = await prisma.user.findUnique({ where: { email: "qa@test.com" } });
  if (user) {
    console.log("User found in DB:", user.name, user.email);
  } else {
    console.log("User NOT found in DB");
  }
}

testRegistration().finally(() => prisma.$disconnect());
