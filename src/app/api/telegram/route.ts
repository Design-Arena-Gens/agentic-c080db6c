import { sendTelegramMessage, verifyTelegramSecret } from '@/lib/telegram';

export const runtime = 'nodejs';

export async function GET() {
  return new Response('OK');
}

export async function POST(request: Request) {
  if (!verifyTelegramSecret(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const update = await request.json().catch(() => ({}));
  const message = update.message || update.edited_message;

  if (message && message.chat && typeof message.chat.id !== 'undefined') {
    const text: string = (message.text || '').toString().trim();
    const reply = text === '/start'
      ? 'Hello! I am a simple echo bot.'
      : text
        ? `Echo: ${text}`
        : 'Send me any text and I will echo it back.';

    await sendTelegramMessage(message.chat.id, reply);
  }

  return new Response('OK');
}
