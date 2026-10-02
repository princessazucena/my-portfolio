export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide all required fields: name, email, and message.' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.MAIL_SENDER || 'ceaneazucena@gmail.com';
  const recipientEmail = 'ceaneazucena@gmail.com';

  if (!apiKey) {
    return res.status(500).json({ 
      error: 'Brevo API key is not configured in environment variables (BREVO_API_KEY).' 
    });
  }

  try {
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { 
          name: `${name} (via Portfolio)`, 
          email: senderEmail 
        },
        to: [
          { 
            email: recipientEmail, 
            name: 'Princess Anne Azucena' 
          }
        ],
        replyTo: { 
          email: email, 
          name: name 
        },
        subject: `[Portfolio Inquiry] ${subject || 'New Contact Message from ' + name}`,
        htmlContent: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 24px; color: #1e293b; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <div style="margin-bottom: 20px;">
              <h2 style="color: #0f172a; margin: 0 0 6px; font-size: 20px;">New Message from Portfolio</h2>
              <p style="color: #64748b; font-size: 13px; margin: 0;">Received via Princess Anne B. Azucena Portfolio Website</p>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <table style="width: 100%; font-size: 14px; margin-bottom: 16px;">
              <tr>
                <td style="width: 120px; color: #64748b; padding: 6px 0;"><strong>Sender:</strong></td>
                <td style="color: #0f172a; padding: 6px 0;">${name}</td>
              </tr>
              <tr>
                <td style="color: #64748b; padding: 6px 0;"><strong>Email:</strong></td>
                <td style="color: #0f172a; padding: 6px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="color: #64748b; padding: 6px 0;"><strong>Subject:</strong></td>
                <td style="color: #0f172a; padding: 6px 0;">${subject || 'General Inquiry'}</td>
              </tr>
            </table>
            <div style="padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #0f172a; font-size: 14px; line-height: 1.6; color: #334155; margin-top: 12px;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 12px;" />
            <p style="font-size: 12px; color: #94a3b8; margin: 0; text-align: center;">
              You can hit "Reply" in your email client to respond directly to ${name} (${email}).
            </p>
          </div>
        `,
      }),
    });

    const data = await brevoResponse.json();

    if (!brevoResponse.ok) {
      console.error('Brevo API Error:', data);
      return res.status(brevoResponse.status).json({ 
        error: data.message || 'Failed to dispatch email via Brevo.' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Transmission dispatched successfully to Princess Azucena.',
      messageId: data.messageId 
    });
  } catch (error) {
    console.error('Server error dispatching email:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
