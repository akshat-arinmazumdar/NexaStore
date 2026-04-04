const sgMail = require('@sendgrid/mail')
require('dotenv').config({ path: '.env' })

console.log('API Key exists:', !!process.env.SENDGRID_API_KEY)
console.log('From email:', process.env.EMAIL_FROM)

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

sgMail.send({
  to: 'pocketmoneystudents@gmail.com',
  from: 'pocketmoneystudents@gmail.com',
  subject: 'NexaStore Test ✅',
  text: 'Email system working!'
})
.then(() => console.log('✅ SUCCESS - Email sent!'))
.catch(err => console.error('❌ FAILED:', JSON.stringify(err.response?.body)))
