import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Telegramga yuboriladigan chiroyli xabar matni
    const itemsList = data.items
      ?.map(
        (item: any, i: number) =>
          `${i + 1}. *${item.name}* (${item.color}) x ${item.quantity} = ${item.total} so'm`
      )
      .join('\n');

    const messageText = `
🎧 *YANGI BUYURTMA #${data.orderId}*

👤 *Mijoz:* ${data.fullName}
📞 *Telefon:* ${data.phone}
📍 *Manzil:* ${data.city}, ${data.address}
💳 *To'lov usuli:* ${data.paymentMethod}
${data.notes ? `📝 *Izoh:* ${data.notes}\n` : ''}
📦 *Mahsulotlar:*
${itemsList}

💰 *Jami summa:* *${data.totalPrice}*
🚚 *Yetkazib berish:* ${data.shippingFee}
    `.trim();

    // Agar Telegram Bot Token va Chat ID sozlangan bo'lsa Telegram API ga yuboramiz
    if (botToken && chatId) {
      try {
        const tgRes = await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: messageText,
              parse_mode: 'Markdown',
            }),
          }
        );
        const tgJson = await tgRes.json();
        return NextResponse.json({ success: true, telegramSent: tgJson.ok, messageText });
      } catch (tgError) {
        console.error('Telegram API error:', tgError);
      }
    }

    // Token bo'lmaganda ham muvaffaqiyatli qabul qilingan deb xabar matnini qaytaramiz
    return NextResponse.json({
      success: true,
      telegramSent: false,
      messageText,
      message: 'Buyurtma tizimga qabul qilindi',
    });
  } catch (error: any) {
    console.error('Order API error:', error);
    return NextResponse.json(
      { success: false, error: 'Buyurtmani qayta ishlashda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}
