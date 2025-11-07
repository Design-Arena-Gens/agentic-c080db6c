const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API_URL = TOKEN ? `https://api.telegram.org/bot${TOKEN}` : undefined;

export async function sendTelegramMessage(
  chatId: number | string,
  text: string
): Promise<unknown> {
  if (!API_URL) {
    return { ok: false, error: 'TELEGRAM_BOT_TOKEN not set' };
  }
  const res = await fetch(`${API_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  try {
    return await res.json();
  } catch {
    return { ok: false };
  }
}

export function verifyTelegramSecret(request: Request): boolean {
  const expected = process.env.TELEGRAM_SECRET_TOKEN;
  if (!expected) return true;
  const header = request.headers.get('x-telegram-bot-api-secret-token');
  return header === expected;
}
