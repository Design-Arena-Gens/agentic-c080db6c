import crypto from 'node:crypto';

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('Error: TELEGRAM_BOT_TOKEN is not set');
  process.exit(1);
}

const url = process.env.WEBHOOK_URL || 'https://agentic-c080db6c.vercel.app/api/telegram';
let secret = process.env.TELEGRAM_SECRET_TOKEN;

if (!secret) {
  secret = crypto.randomUUID();
  console.log('Generated TELEGRAM_SECRET_TOKEN (save this for verification):', secret);
}

const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    url,
    secret_token: secret,
    allowed_updates: ['message', 'edited_message']
  }),
});

const data = await res.json();
console.log(JSON.stringify(data, null, 2));
