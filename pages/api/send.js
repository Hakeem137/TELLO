import { firestore, FieldValue } from '../../lib/firebaseAdmin';
import crypto from 'crypto';

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
const IP_SALT = process.env.IP_SALT || 'default_salt';
const RATE_LIMIT_WINDOW_MIN = Number(process.env.RATE_LIMIT_WINDOW_MIN || 60);
const RATE_LIMIT_COUNT = Number(process.env.RATE_LIMIT_COUNT || 5);
async function verifyRecaptcha(token) {
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `secret=${encodeURIComponent(RECAPTCHA_SECRET)}&response=${encodeURIComponent(token)}`
    }
  );
  const json = await res.json();
  return json.success && (json.score ? json.score >= 0.5 : true);
}
function getIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket.remoteAddress;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});

  const { to, text, recaptchaToken } = req.body;
  if (!to || !text || !recaptchaToken) return res.status(400).json({error:'Missing fields'});
try {
    const ok = await verifyRecaptcha(recaptchaToken);
    if (!ok) return res.status(400).json({ error: 'reCAPTCHA failed' });
  } catch (e) {
    console.error('recaptcha verify error', e);
    return res.status(500).json({ error: 'recaptcha verify error' });
  }
const messageText = String(text).slice(0, 2000);

  const ip = getIP(req) || 'unknown';
  const ipHash = crypto.createHash('sha256').update(ip + IP_SALT).digest('hex');

  const windowMs = RATE_LIMIT_WINDOW_MIN * 60 * 1000;
  const cutoff = Date.now() - windowMs;

  try {
    const q = firestore.collection('messages')
      .where('ip_hash', '==', ipHash)
      .where('created_at', '>', new Date(cutoff));
    const snap = await q.get();
    if (snap.size >= RATE_LIMIT_COUNT) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }

  const userSnap = await firestore.collection('users').where('username','==',to).limit(1).get();
    if (userSnap.empty) return res.status(404).json({ error: 'Recipient not found'});

    await firestore.collection('messages').add({
      to,
      text: messageText,
      created_at: FieldValue.serverTimestamp(),
      ip_hash: ipHash,
      moderated: false,
      blocked: false,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
}
