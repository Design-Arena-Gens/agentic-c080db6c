const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('Error: TELEGRAM_BOT_TOKEN is not set');
  process.exit(1);
}

const res = await fetch(`https://api.telegram.org/bot${token}/deleteWebhook`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ drop_pending_updates: true }),
});

const data = await res.json();
console.log(JSON.stringify(data, null, 2));
