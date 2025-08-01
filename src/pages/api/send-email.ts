import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, text } = req.body;
  const [name, phone, email, service, message] = text.split('\n').map((line: string) => line.split(': ')[1] || '');

  // Configure transporter with Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // HTML email template with hosted image URL
  const htmlEmail = `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="padding: 20px; text-align: left;">
              <h2 style="color: #2e7d32; margin: 0 0 20px;">New Service Request</h2>
              <p style="color: #666; margin: 0 0 15px;"><strong>Service:</strong> ${service}</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background-color: #e8f5e9;">
                  <td style="padding: 10px; border-bottom: 1px solid #ccc;"><strong>Name</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #ccc;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ccc;"><strong>Phone</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #ccc;">${phone}</td>
                </tr>
                <tr style="background-color: #e8f5e9;">
                  <td style="padding: 10px; border-bottom: 1px solid #ccc;"><strong>Email</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #ccc;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ccc;"><strong>Message</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #ccc;">${message}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; text-align: center; display: block;">
                <img src="https://i.ibb.co/fYmvV8Pj/Captura-de-pantalla-2025-07-28-233243.png" alt="Titulo Image" style="max-width: 100%; height: auto; display: block;" />
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    // Generate a unique messageId for each email
    const uniqueMessageId = `<${Date.now()}-${Math.random().toString(36).substr(2, 9)}@studio-sobra.com>`;

    // Send email with HTML and unique messageId
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlEmail,
      headers: {
        'Message-ID': uniqueMessageId, // Ensure a new conversation
      },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}