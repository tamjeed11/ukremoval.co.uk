const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const data = req.body;
    const formType = data.formType || 'contact';

    let subject, htmlBody;

    if (formType === 'quote') {
      subject = `🚚 New Quote Request – ${data.service || ''} – ${data.firstName || ''} ${data.lastName || ''}`;
      htmlBody = buildQuoteEmail(data);
    } else {
      subject = `📩 New Contact Message – ${data.firstName || ''} ${data.lastName || ''}`;
      htmlBody = buildContactEmail(data);
    }

    const { error } = await resend.emails.send({
      from: 'UK Removal & Logistics <onboarding@resend.dev>',
      to: ['sales@ukremoval.co.uk'],
      replyTo: data.email || 'sales@ukremoval.co.uk',
      subject,
      html: htmlBody,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

function buildQuoteEmail(d) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;border-radius:12px;overflow:hidden;">
    <div style="background:#050508;padding:28px 32px;text-align:center;">
      <h1 style="color:#00D4AA;margin:0;font-size:22px;">🚚 UK Removal & Logistics</h1>
      <p style="color:#888;margin:6px 0 0;font-size:13px;">New Quote Request</p>
    </div>
    <div style="padding:32px;background:#ffffff;">
      <h2 style="color:#111;font-size:18px;margin:0 0 20px;border-bottom:2px solid #00D4AA;padding-bottom:12px;">📋 Quote Details</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="background:#f0fdf9;"><td style="padding:10px 14px;font-weight:700;color:#555;width:40%;font-size:13px;">Service</td><td style="padding:10px 14px;color:#111;font-size:14px;font-weight:600;">${d.service || ' '}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Moving From</td><td style="padding:10px 14px;color:#111;font-size:14px;">${d.movingFrom || ' '}</td></tr>
        <tr style="background:#f0fdf9;"><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Moving To</td><td style="padding:10px 14px;color:#111;font-size:14px;">${d.movingTo || ' '}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Preferred Date</td><td style="padding:10px 14px;color:#111;font-size:14px;">${d.preferredDate || ' '}</td></tr>
        <tr style="background:#f0fdf9;"><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Property Type</td><td style="padding:10px 14px;color:#111;font-size:14px;">${d.propertyType || ' '}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Packing Help</td><td style="padding:10px 14px;color:#111;font-size:14px;">${d.packingHelp || ' '}</td></tr>
        <tr style="background:#f0fdf9;"><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Access Details</td><td style="padding:10px 14px;color:#111;font-size:14px;">${d.accessDetails || ' '}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Additional Notes</td><td style="padding:10px 14px;color:#111;font-size:14px;">${d.notes || ' '}</td></tr>
      </table>
      <h2 style="color:#111;font-size:18px;margin:28px 0 20px;border-bottom:2px solid #00D4AA;padding-bottom:12px;">👤 Customer Details</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="background:#f0fdf9;"><td style="padding:10px 14px;font-weight:700;color:#555;width:40%;font-size:13px;">Name</td><td style="padding:10px 14px;color:#111;font-size:14px;font-weight:600;">${d.firstName || ''} ${d.lastName || ''}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Email</td><td style="padding:10px 14px;font-size:14px;"><a href="mailto:${d.email}" style="color:#00D4AA;">${d.email || ' '}</a></td></tr>
        <tr style="background:#f0fdf9;"><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Phone</td><td style="padding:10px 14px;font-size:14px;"><a href="tel:${d.phone}" style="color:#00D4AA;">${d.phone || ' '}</a></td></tr>
      </table>
      <div style="margin-top:28px;padding:16px 20px;background:#f0fdf9;border-left:4px solid #00D4AA;border-radius:6px;">
        <p style="margin:0;font-size:13px;color:#555;">⏰ Submitted: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
      </div>
      <div style="margin-top:20px;text-align:center;">
        <a href="tel:${d.phone}" style="display:inline-block;background:#00D4AA;color:#050508;padding:12px 28px;border-radius:50px;font-weight:700;font-size:14px;text-decoration:none;margin:4px;">📞 Call Back Now</a>
        <a href="mailto:${d.email}" style="display:inline-block;background:#111;color:#fff;padding:12px 28px;border-radius:50px;font-weight:700;font-size:14px;text-decoration:none;margin:4px;">✉️ Reply by Email</a>
      </div>
    </div>
    <div style="padding:16px 32px;background:#f9f9f9;text-align:center;">
      <p style="margin:0;font-size:12px;color:#999;">UK Removal & Logistics Ltd · sales@ukremoval.co.uk · 020 3769 9990</p>
    </div>
  </div>`;
}

function buildContactEmail(d) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;border-radius:12px;overflow:hidden;">
    <div style="background:#050508;padding:28px 32px;text-align:center;">
      <h1 style="color:#00D4AA;margin:0;font-size:22px;">🚚 UK Removal & Logistics</h1>
      <p style="color:#888;margin:6px 0 0;font-size:13px;">New Contact Message</p>
    </div>
    <div style="padding:32px;background:#ffffff;">
      <h2 style="color:#111;font-size:18px;margin:0 0 20px;border-bottom:2px solid #00D4AA;padding-bottom:12px;">👤 Contact Details</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="background:#f0fdf9;"><td style="padding:10px 14px;font-weight:700;color:#555;width:40%;font-size:13px;">Name</td><td style="padding:10px 14px;color:#111;font-size:14px;font-weight:600;">${d.firstName || ''} ${d.lastName || ''}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Email</td><td style="padding:10px 14px;font-size:14px;"><a href="mailto:${d.email}" style="color:#00D4AA;">${d.email || ' '}</a></td></tr>
        <tr style="background:#f0fdf9;"><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Phone</td><td style="padding:10px 14px;font-size:14px;"><a href="tel:${d.phone}" style="color:#00D4AA;">${d.phone || ' '}</a></td></tr>
        <tr><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Service Needed</td><td style="padding:10px 14px;color:#111;font-size:14px;">${d.service || ' '}</td></tr>
      </table>
      <h2 style="color:#111;font-size:18px;margin:28px 0 16px;border-bottom:2px solid #00D4AA;padding-bottom:12px;">💬 Message</h2>
      <div style="padding:16px 20px;background:#f9f9f9;border-radius:8px;font-size:14px;color:#333;line-height:1.7;">${d.message || '(no message)'}</div>
      <div style="margin-top:20px;padding:16px 20px;background:#f0fdf9;border-left:4px solid #00D4AA;border-radius:6px;">
        <p style="margin:0;font-size:13px;color:#555;">⏰ Submitted: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
      </div>
      <div style="margin-top:20px;text-align:center;">
        <a href="tel:${d.phone}" style="display:inline-block;background:#00D4AA;color:#050508;padding:12px 28px;border-radius:50px;font-weight:700;font-size:14px;text-decoration:none;margin:4px;">📞 Call Back Now</a>
        <a href="mailto:${d.email}" style="display:inline-block;background:#111;color:#fff;padding:12px 28px;border-radius:50px;font-weight:700;font-size:14px;text-decoration:none;margin:4px;">✉️ Reply by Email</a>
      </div>
    </div>
    <div style="padding:16px 32px;background:#f9f9f9;text-align:center;">
      <p style="margin:0;font-size:12px;color:#999;">UK Removal & Logistics Ltd · sales@ukremoval.co.uk · 020 3769 9990</p>
    </div>
  </div>`;
}
