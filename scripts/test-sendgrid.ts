import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const msg = {
  to: "pocketmoneystudents@gmail.com",
  from: process.env.EMAIL_FROM!,
  subject: "Test SendGrid NexaStore",
  text: "This is a test email to verify SendGrid integration.",
};

sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent successfully");
  })
  .catch((error) => {
    console.error("SendGrid Error:");
    if (error.response) {
      console.error(error.response.body);
    } else {
      console.error(error.message);
    }
  });
