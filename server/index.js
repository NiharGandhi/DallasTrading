const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Resend } = require('resend');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// CORS — restrict to production origin (and localhost for dev)
const allowedOrigins = [
  'https://www.dallastrading.net',
  'https://dallastrading.net',
  'http://localhost:3000',
];
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g. curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json({ limit: '16kb' }));

// Rate limiter for the Gemini proxy: 30 requests per minute per IP
const geminiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Email service is running' });
});

// Send user registration email
app.post('/api/send-user-registration', async (req, res) => {
  try {
    const { userName, userEmail, userCountry } = req.body;

    if (!userName || !userEmail || !userCountry) {
      return res.status(400).json({
        error: 'Missing required fields: userName, userEmail, userCountry'
      });
    }

    // Determine office email based on country
    let officeEmail = process.env.DALLAS_DUBAI_EMAIL || 'info@dallastrading.net';
    let officeLocation = 'Dubai';

    if (userCountry === 'Oman') {
      officeEmail = process.env.DALLAS_OMAN_EMAIL || 'vijay@dallastrading.net';
      officeLocation = 'Oman';
    } else if (userCountry === 'Saudi Arabia' || userCountry === 'Saudi Arabia (through an associated company)') {
      officeEmail = process.env.DALLAS_SAUDI_EMAIL || 'jay@pesgulf.com';
      officeLocation = 'Saudi Arabia';
    } else if (userCountry === 'Bahrain') {
      officeEmail = process.env.DALLAS_DUBAI_EMAIL || 'info@dallastrading.net';
      officeLocation = 'Bahrain';
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Dallas Chatbot <onboarding@resend.dev>',
      to: [officeEmail],
      subject: 'New Chatbot User Registration',
      html: `
        <h2>New User Registration on Dallas Chatbot</h2>
        <p>A new user has registered on the Dallas Group chatbot:</p>

        <table style="border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${userName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${userEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Country:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${userCountry}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Office:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${officeLocation}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Timestamp:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
          </tr>
        </table>

        <p style="color: #666; font-size: 12px;">This is an automated notification from the Dallas Group website chatbot.</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

// Send product inquiry email
app.post('/api/send-inquiry', async (req, res) => {
  try {
    const { userName, userEmail, userCountry, inquiryPhone, inquiryMessage, companyName, companyLocation } = req.body;

    if (!userName || !userEmail || !userCountry || !inquiryMessage) {
      return res.status(400).json({
        error: 'Missing required fields: userName, userEmail, userCountry, inquiryMessage'
      });
    }

    // Determine office email based on country
    let officeEmail = process.env.DALLAS_DUBAI_EMAIL || 'info@dallastrading.net';
    let officeLocation = 'Dubai';

    if (userCountry === 'Oman') {
      officeEmail = process.env.DALLAS_OMAN_EMAIL || 'vijay@dallastrading.net';
      officeLocation = 'Oman';
    } else if (userCountry === 'Saudi Arabia' || userCountry === 'Saudi Arabia (through an associated company)') {
      officeEmail = process.env.DALLAS_SAUDI_EMAIL || 'jay@pesgulf.com';
      officeLocation = 'Saudi Arabia';
    } else if (userCountry === 'Bahrain') {
      officeEmail = process.env.DALLAS_DUBAI_EMAIL || 'info@dallastrading.net';
      officeLocation = 'Bahrain';
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Dallas Chatbot <onboarding@resend.dev>',
      to: [officeEmail],
      replyTo: userEmail,
      subject: `Product Inquiry from ${userName} - ${userCountry}`,
      html: `
        <h2>New Product Inquiry from Dallas Chatbot</h2>
        <p>A customer has submitted an inquiry through the chatbot:</p>

        <table style="border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${userName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${userEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${inquiryPhone || 'Not provided'}</td>
          </tr>
          ${companyName ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${companyName}</td>
          </tr>
          ` : ''}
          ${companyLocation ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company Location:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${companyLocation}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Region/Branch Inquiring About:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${userCountry}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Office:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${officeLocation}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Timestamp:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
          </tr>
        </table>

        <h3>Inquiry Details:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #0066cc; margin: 20px 0;">
          ${inquiryMessage.replace(/\n/g, '<br>')}
        </div>

        <p style="color: #666; font-size: 12px;">
          This is an automated notification from the Dallas Group website chatbot.<br>
          You can reply directly to this email to respond to ${userName}.
        </p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

// Send contact form email
app.post('/api/send-contact-form', async (req, res) => {
  try {
    const { name, email, phone, message, country, companyName, companyLocation } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, message'
      });
    }

    // Determine office email based on country or use Dubai as default
    let officeEmail = process.env.DALLAS_DUBAI_EMAIL || 'info@dallastrading.net';

    if (country === 'Oman' || country === 'Oman (Muscat Office)') {
      officeEmail = process.env.DALLAS_OMAN_EMAIL || 'vijay@dallastrading.net';
    } else if (country === 'Saudi Arabia' || country === 'Saudi Arabia (through an associated company)') {
      officeEmail = process.env.DALLAS_SAUDI_EMAIL || 'jay@pesgulf.com';
    } else if (country === 'Bahrain' || country === 'Bahrain (Warehouse)') {
      officeEmail = process.env.DALLAS_DUBAI_EMAIL || 'info@dallastrading.net';
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Dallas Contact Form <onboarding@resend.dev>',
      to: [officeEmail],
      replyTo: email,
      subject: `Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p>A visitor has submitted the contact form on the Dallas Group website:</p>

        <table style="border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
          </tr>
          ` : ''}
          ${companyName ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${companyName}</td>
          </tr>
          ` : ''}
          ${companyLocation ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company Location:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${companyLocation}</td>
          </tr>
          ` : ''}
          ${country ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Region/Branch Inquiring About:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${country}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Timestamp:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
          </tr>
        </table>

        <h3>Message:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #0066cc; margin: 20px 0;">
          ${message.replace(/\n/g, '<br>')}
        </div>

        <p style="color: #666; font-size: 12px;">
          This is an automated notification from the Dallas Group contact form.<br>
          You can reply directly to this email to respond to ${name}.
        </p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

// Gemini proxy — key never leaves the server
app.post('/api/gemini', geminiLimiter, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Invalid request: prompt must be a non-empty string.' });
    }

    if (prompt.length > 8000) {
      return res.status(400).json({ error: 'Request too large.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('[gemini] GEMINI_API_KEY is not set');
      return res.status(503).json({ error: 'AI service is not configured.' });
    }

    const geminiRes = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-latest:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!geminiRes.ok) {
      console.error('[gemini] upstream error:', geminiRes.status);
      return res.status(502).json({ error: 'AI service temporarily unavailable. Please try again.' });
    }

    const json = await geminiRes.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({ text });
  } catch (err) {
    // Log without exposing the key or stack to the client
    console.error('[gemini] Error calling Gemini API:', err.message);
    res.status(502).json({ error: 'AI service temporarily unavailable. Please try again.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✉️  Email service running on http://localhost:${PORT}`);
  console.log(`📧 Resend API Key configured: ${!!process.env.RESEND_API_KEY}`);
});
