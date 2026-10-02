import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Only POST is accepted.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const { name, email, subject, message } = body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide all required fields: name, email, and message.' });
  }

  const mailUser = process.env.MAIL_USERNAME || 'aab915001@smtp-brevo.com';
  const mailPass = process.env.MAIL_PASSWORD;
  const mailHost = process.env.MAIL_SERVER || 'smtp-relay.brevo.com';
  const mailPort = parseInt(process.env.MAIL_PORT || '587', 10);
  const senderEmail = process.env.MAIL_SENDER || 'ceaneazucena@gmail.com';
  const recipientEmail = 'ceaneazucena@gmail.com';

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 24px; color: #1e293b; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="margin-bottom: 20px;">
        <h2 style="color: #0f172a; margin: 0 0 6px; font-size: 20px;">New Message from Portfolio</h2>
        <p style="color: #64748b; font-size: 13px; margin: 0;">Received via Princess Anne B. Azucena Portfolio Website</p>
      </div>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      <table style="width: 100%; font-size: 14px; margin-bottom: 16px;">
        <tr>
          <td style="width: 120px; color: #64748b; padding: 6px 0;"><strong>Sender Name:</strong></td>
          <td style="color: #0f172a; padding: 6px 0;">${name}</td>
        </tr>
        <tr>
          <td style="width: 120px; color: #64748b; padding: 6px 0;"><strong>Sender Email:</strong></td>
          <td style="color: #0f172a; padding: 6px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <td style="width: 120px; color: #64748b; padding: 6px 0;"><strong>Subject:</strong></td>
          <td style="color: #0f172a; padding: 6px 0;">${subject || 'General Inquiry'}</td>
        </tr>
      </table>
      <div style="padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #0f172a; font-size: 14px; line-height: 1.6; color: #334155; margin-top: 12px;">
        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
      </div>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 12px;" />
      <p style="font-size: 12px; color: #94a3b8; margin: 0; text-align: center;">
        Hit "Reply" in your email client to respond directly to ${name} (${email}).
      </p>
    </div>
  `;

  // 1. Primary delivery method: Brevo SMTP via Nodemailer
  if (mailPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: mailPort === 465,
        auth: {
          user: mailUser,
          pass: mailPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"${name} (via Portfolio)" <${senderEmail}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `[Portfolio Inquiry] ${subject || 'New Contact Message from ' + name}`,
        html: htmlContent,
        text: `From: ${name} (${email})\nSubject: ${subject || 'General Inquiry'}\n\nMessage:\n${message}`,
      });

      return res.status(200).json({
        success: true,
        message: 'Transmission dispatched successfully to ceaneazucena@gmail.com.',
        messageId: info.messageId,
      });
    } catch (smtpError) {
      console.error('SMTP Delivery error:', smtpError);
    }
  }

  // 2. Secondary fallback method: Brevo HTTP REST API
  const apiKey = process.env.BREVO_API_KEY;
  if (apiKey) {
    try {
      const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          sender: { name: `${name} (via Portfolio)`, email: senderEmail },
          to: [{ email: recipientEmail, name: 'Princess Anne Azucena' }],
          replyTo: { email: email, name: name },
          subject: `[Portfolio Inquiry] ${subject || 'New Contact Message from ' + name}`,
          htmlContent: htmlContent,
        }),
      });

      const data = await brevoResponse.json();
      if (brevoResponse.ok) {
        return res.status(200).json({
          success: true,
          message: 'Transmission dispatched successfully via Brevo REST API.',
          messageId: data.messageId,
        });
      }
    } catch (restError) {
      console.error('REST API error:', restError);
    }
  }

  return res.status(500).json({
    error: 'Email configuration missing or invalid. Please check Vercel environment variables.',
  });
}
