import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not defined');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const sendEmail = async ({ to, subject, text, html }: EmailOptions) => {
  const msg = {
    to,
    from: process.env.EMAIL_FROM || 'NexaStore <pocketmoneystudents@gmail.com>',
    subject,
    text,
    html,
    headers: {
      'List-Unsubscribe': `<mailto:support@nexastore.com?subject=unsubscribe>, <https://nexastore.com/unsubscribe>`,
      'X-Priority': '1',
      'Importance': 'high'
    }
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error: any) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw new Error('Failed to send email');
  }
};
