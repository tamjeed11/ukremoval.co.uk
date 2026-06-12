// ================================================================
// RAPID MOVE REMOVALS  Google Apps Script v3
// Handles: Contact/Quote emails + Blog CMS (read & write)
// ================================================================
//
// SETUP INSTRUCTIONS:
//
// 1. Go to https://script.google.com
// 2. Open your existing project (or create a new one)
// 3. Replace everything with this file
// 4. Set RECIPIENT_EMAIL below
// 5. Create a Google Sheet:
//    - Go to https://sheets.google.com → create new sheet
//    - Name the first sheet tab exactly: "Posts"
//    - Copy the Sheet ID from the URL:
//      https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
//    - Paste it below as SHEET_ID
// 6. Click Save → Deploy → New Deployment → Web App
//    Execute as: Me | Who has access: Anyone
// 7. Authorize → Copy the Web App URL
// 8. Paste URL into blog-admin.html and blog-data.js
//    replacing PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE
//
// The "Posts" sheet will be auto-created with headers on first use.
// ================================================================


const RECIPIENT_EMAIL = '[CLIENT TO PROVIDE]';
const CC_EMAIL = '';
const SHEET_ID = '1ObT6a6Qt7oQGn3mmjhsxB6HcZhtIhXKMV_7lgN4hliY'; // ← replace this
const BLOG_PASSWORD = 'rapidmove2026';        // ← same as admin panel password

// ── ROUTER ── decides what action to take
function doGet(e) {
  try {

    // Prevent errors when run manually in Apps Script editor
    e = e || {};

    // Read action safely
    const action = (e.parameter && e.parameter.action)
      ? e.parameter.action
      : '';

    // GET BLOG POSTS
    if (action === 'getPosts') {
      return getPosts();
    }

    // Default response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'UK Removal & Logistics API is running'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {

    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || '';

    if (action === 'savePost')   return savePost(data);
    if (action === 'deletePost') return deletePost(data);

    // Legacy: contact/quote form emails
    const formType = data.formType || 'contact';
    let subject = '', htmlBody = '';

    if (formType === 'quote') {
      subject  = '🚚 New Quote Request – ' + (data.service||'') + ' – ' + (data.firstName||'') + ' ' + (data.lastName||'');
      htmlBody = buildQuoteEmail(data);
    } else {
      subject  = '📩 New Contact Message – ' + (data.firstName||'') + ' ' + (data.lastName||'');
      htmlBody = buildContactEmail(data);
    }

    GmailApp.sendEmail(RECIPIENT_EMAIL, subject,
      'Please view this email in an HTML-capable client.',
      { htmlBody, replyTo: data.email || RECIPIENT_EMAIL, cc: CC_EMAIL || undefined, name: 'UK Removal & Logistics Website' }
    );

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Email sent successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── CORS preflight ──
function doOptions(e) {
  return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.TEXT);
}

// ================================================================
// BLOG CMS FUNCTIONS
// ================================================================

function getSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName('Posts');
  if (!sheet) {
    sheet = ss.insertSheet('Posts');
    sheet.appendRow(['slug','title','excerpt','content','category','date','author','readTime','image','tags','created']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// GET all posts  called by blog-data.js on page load
function getPosts() {
  try {
    const sheet = getSheet();
    const rows  = sheet.getDataRange().getValues();
    if (rows.length <= 1) {
      return jsonResponse({ success: true, posts: [] });
    }
    const headers = rows[0];
    const posts = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => obj[h] = row[i]);
      // tags stored as comma-separated string
      obj.tags = obj.tags ? obj.tags.toString().split(',').map(t => t.trim()).filter(Boolean) : [];
      obj.readTime = parseInt(obj.readTime) || 5;
      return obj;
    }).filter(p => p.slug); // skip empty rows
    // newest first
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    return jsonResponse({ success: true, posts });
  } catch(e) {
    return jsonResponse({ success: false, message: e.toString() });
  }
}

// POST save (create or update) a post
function savePost(data) {
  if (data.password !== BLOG_PASSWORD) {
    return jsonResponse({ success: false, message: 'Unauthorized' });
  }
  try {
    const sheet = getSheet();
    const rows  = sheet.getDataRange().getValues();
    const headers = rows[0];

    const tagsStr  = Array.isArray(data.tags) ? data.tags.join(',') : (data.tags || '');

    // Sanitize  ensure content is a plain string (not double-encoded)
    const slug     = String(data.slug    || '').trim();
    const title    = String(data.title   || '').trim();
    const excerpt  = String(data.excerpt || '').trim();
    const content  = String(data.content || '').trim();
    const category = String(data.category|| '').trim();
    const date     = String(data.date    || '').substring(0, 10);
    const author   = String(data.author  || 'Rapid Move Team').trim();
    const readTime = parseInt(data.readTime) || 5;
    const image    = String(data.image   || '').trim();

    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][headers.indexOf('slug')]).trim() === slug) {
        const rowNum = i + 1;
        sheet.getRange(rowNum, 1, 1, headers.length).setValues([[
          slug, title, excerpt, content, category, date, author,
          readTime, image, tagsStr, rows[i][headers.indexOf('created')]
        ]]);
        return jsonResponse({ success: true, message: 'Post updated' });
      }
    }

    sheet.appendRow([
      slug, title, excerpt, content, category, date, author,
      readTime, image, tagsStr, new Date().toISOString()
    ]);
    return jsonResponse({ success: true, message: 'Post saved' });

  } catch(e) {
    return jsonResponse({ success: false, message: e.toString() });
  }
}
// POST delete a post by slug
function deletePost(data) {
  if (data.password !== BLOG_PASSWORD) {
    return jsonResponse({ success: false, message: 'Unauthorized' });
  }
  try {
    const sheet = getSheet();
    const rows  = sheet.getDataRange().getValues();
    const headers = rows[0];
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][headers.indexOf('slug')] === data.slug) {
        sheet.deleteRow(i + 1);
        return jsonResponse({ success: true, message: 'Post deleted' });
      }
    }
    return jsonResponse({ success: false, message: 'Post not found' });
  } catch(e) {
    return jsonResponse({ success: false, message: e.toString() });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ================================================================
// TEST FUNCTION  run this in editor to verify everything works
// ================================================================
function testBlog() {
  const sheet = getSheet();
  Logger.log('Sheet ready: ' + sheet.getName());
  Logger.log('Rows: ' + sheet.getLastRow());
}

function testSendEmail() {
  GmailApp.sendEmail(
    RECIPIENT_EMAIL,
    '✅ Test Email – UK Removal & Logistics Script Working',
    '',
    {
      htmlBody: '<h2 style="color:#00D4AA;">✅ Your Google Apps Script is working!</h2><p>Time: ' + new Date().toLocaleString() + '</p>',
      name: 'UK Removal & Logistics Website'
    }
  );
  Logger.log('Test email sent to: ' + RECIPIENT_EMAIL);
}

// ================================================================
// EMAIL BUILDERS (unchanged from v2)
// ================================================================

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
        <tr style="background:#f0fdf9;"><td style="padding:10px 14px;font-weight:700;color:#555;width:40%;font-size:13px;">Service</td><td style="padding:10px 14px;color:#111;font-size:14px;font-weight:600;">${d.service||' '}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Moving From</td><td style="padding:10px 14px;color:#111;font-size:14px;">${d.movingFrom||' '}</td></tr>
        <tr style="background:#f0fdf9;"><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Moving To</td><td style="padding:10px 14px;color:#111;font-size:14px;">${d.movingTo||' '}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Preferred Date</td><td style="padding:10px 14px;color:#111;font-size:14px;">${d.preferredDate||' '}</td></tr>
        <tr style="background:#f0fdf9;"><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Property Type</td><td style="padding:10px 14px;color:#111;font-size:14px;">${d.propertyType||' '}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Packing Help</td><td style="padding:10px 14px;color:#111;font-size:14px;">${d.packingHelp||' '}</td></tr>
      </table>
      <h2 style="color:#111;font-size:18px;margin:28px 0 20px;border-bottom:2px solid #00D4AA;padding-bottom:12px;">👤 Customer Details</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="background:#f0fdf9;"><td style="padding:10px 14px;font-weight:700;color:#555;width:40%;font-size:13px;">Name</td><td style="padding:10px 14px;color:#111;font-size:14px;font-weight:600;">${d.firstName||''} ${d.lastName||''}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Email</td><td style="padding:10px 14px;font-size:14px;"><a href="mailto:${d.email}" style="color:#00D4AA;">${d.email||' '}</a></td></tr>
        <tr style="background:#f0fdf9;"><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Phone</td><td style="padding:10px 14px;font-size:14px;"><a href="tel:${d.phone}" style="color:#00D4AA;">${d.phone||' '}</a></td></tr>
      </table>
      <div style="margin-top:28px;padding:16px 20px;background:#f0fdf9;border-left:4px solid #00D4AA;border-radius:6px;">
        <p style="margin:0;font-size:13px;color:#555;">⏰ Submitted: ${new Date().toLocaleString('en-GB',{timeZone:'Europe/London'})}</p>
      </div>
      <div style="margin-top:20px;text-align:center;">
        <a href="tel:${d.phone}" style="display:inline-block;background:#00D4AA;color:#050508;padding:12px 28px;border-radius:50px;font-weight:700;font-size:14px;text-decoration:none;margin:4px;">📞 Call Back Now</a>
        <a href="mailto:${d.email}" style="display:inline-block;background:#111;color:#fff;padding:12px 28px;border-radius:50px;font-weight:700;font-size:14px;text-decoration:none;margin:4px;">✉️ Reply by Email</a>
      </div>
    </div>
    <div style="padding:16px 32px;background:#f9f9f9;text-align:center;">
      <p style="margin:0;font-size:12px;color:#999;">UK Removal & Logistics Ltd · [CLIENT TO PROVIDE] · [CLIENT TO PROVIDE]</p>
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
        <tr style="background:#f0fdf9;"><td style="padding:10px 14px;font-weight:700;color:#555;width:40%;font-size:13px;">Name</td><td style="padding:10px 14px;color:#111;font-size:14px;font-weight:600;">${d.firstName||''} ${d.lastName||''}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Email</td><td style="padding:10px 14px;font-size:14px;"><a href="mailto:${d.email}" style="color:#00D4AA;">${d.email||' '}</a></td></tr>
        <tr style="background:#f0fdf9;"><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Phone</td><td style="padding:10px 14px;font-size:14px;"><a href="tel:${d.phone}" style="color:#00D4AA;">${d.phone||' '}</a></td></tr>
        <tr><td style="padding:10px 14px;font-weight:700;color:#555;font-size:13px;">Service Needed</td><td style="padding:10px 14px;color:#111;font-size:14px;">${d.service||' '}</td></tr>
      </table>
      <h2 style="color:#111;font-size:18px;margin:28px 0 16px;border-bottom:2px solid #00D4AA;padding-bottom:12px;">💬 Message</h2>
      <div style="padding:16px 20px;background:#f9f9f9;border-radius:8px;font-size:14px;color:#333;line-height:1.7;">${d.message||'(no message)'}</div>
      <div style="margin-top:20px;padding:16px 20px;background:#f0fdf9;border-left:4px solid #00D4AA;border-radius:6px;">
        <p style="margin:0;font-size:13px;color:#555;">⏰ Submitted: ${new Date().toLocaleString('en-GB',{timeZone:'Europe/London'})}</p>
      </div>
      <div style="margin-top:20px;text-align:center;">
        <a href="tel:${d.phone}" style="display:inline-block;background:#00D4AA;color:#050508;padding:12px 28px;border-radius:50px;font-weight:700;font-size:14px;text-decoration:none;margin:4px;">📞 Call Back Now</a>
        <a href="mailto:${d.email}" style="display:inline-block;background:#111;color:#fff;padding:12px 28px;border-radius:50px;font-weight:700;font-size:14px;text-decoration:none;margin:4px;">✉️ Reply by Email</a>
      </div>
    </div>
    <div style="padding:16px 32px;background:#f9f9f9;text-align:center;">
      <p style="margin:0;font-size:12px;color:#999;">UK Removal & Logistics Ltd · [CLIENT TO PROVIDE] · [CLIENT TO PROVIDE]</p>
    </div>
  </div>`;
}