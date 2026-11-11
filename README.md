# Quloqchin.uz — Zamonaviy Quloqchinlar Do'koni

O'zbekistondagi foydalanuvchilar uchun moslashtirilgan, yuqori tezlikda ishlovchi zamonaviy simsiz, TWS, o'yin va studiya quloqchinlari internet-do'koni.

---

## Asosiy imkoniyatlar

- **Next.js 14 (App Router)** arxitekturasi va Server Components yordamida maksimal tezlik (Lighthouse 90+).
- **TypeScript** to'liq statik turlash.
- **Tailwind CSS** orqali zamonaviy, toza va to'liq mobilga mos (mobile-first) dizayn.
- **Och / Qorong'i (Light/Dark) rejim** (`next-themes`).
- **Savat holati (Cart State)**: Zustand + localStorage sinxronizatsiyasi.
- **Tezkor Savat Drawer**: Har qanday sahifadan savatni boshqarish, miqdorni o'zgartirish va bepul yetkazib berish chegarasi indikatori.
- **Keng qamrovli Katalog**:
  - Qidiruv (jonli qidirish)
  - Kategoriyalar bo'yicha filtr (Simsiz, Simli, TWS, O'yin uchun)
  - Brendlar bo'yicha filtr (Sony, Apple, Marshall, HyperX, va hk)
  - Narx oralig'i filtri
  - Saralash: eng ommabop, narx o'sishi/kamayishi, reyting, yangi tovarlar.
- **Mahsulot sahifasi**: Rasmlar galereyasi, rang tanlash, texnik parametrlar jadvali, o'xshash modellar tavsiyasi.
- **Buyurtma berish (Checkout)**:
  - +998 telefon formati va tekshiruvi
  - Viloyat va aniq manzil kiritish
  - To'lov turi tanlash (Naqd, Click, Payme, Karta)
  - Telegram botga yuborish (API Route) va to'g'ridan-to'g'ri Telegram/Mailto orqali jo'natish imkoniyati.
- **O'zbek tili va so'm valyutasi**: Narxlar formatlangan (`1 250 000 so'm`).

---

## Texnologiyalar

- **Framework**: Next.js 14
- **Dasturlash tili**: TypeScript
- **Styling**: Tailwind CSS
- **Holat boshqaruvi**: Zustand
- **Ikonkalar**: Lucide React
- **Rejim boshqaruvi**: next-themes
- **Ma'lumotlar**: `data/products.json`

---

## O'rnatish va ishga tushirish

### 1. Loyihani yuklab olish
```bash
git clone <repository-url>
cd quloqchin
```

### 2. Kutubxonalarni o'rnatish
```bash
npm install
```

### 3. Muhit o'zgaruvchilari (ixtiyoriy)
Telegram botga buyurtma yuborish uchun `.env.example` faylidan nusxa oling:
```bash
cp .env.example .env.local
```
Fayl ichida o'zingizning `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` qiymatlaringizni kiriting.

### 4. Dasturchi rejimida ishga tushirish
```bash
npm run dev
```
Brauzerda [http://localhost:3000](http://localhost:3000) manzilini oching.

### 5. Ishlab chiqarish (Production) uchun build qilish
```bash
npm run build
npm run start
```

---

## Loyiha strukturasi

```text
quloqchin/
├── data/
│   └── products.json          # 12 ta namunaviy quloqchin ma'lumotlari
├── public/
│   └── images/products/       # Mahsulotlarning SVG/WebP rasmlari
├── src/
│   ├── app/
│   │   ├── api/order/route.ts # Buyurtmani Telegramga uzatuvchi API
│   │   ├── catalog/           # Katalog sahifasi (filtr, qidiruv)
│   │   ├── products/[id]/     # Mahsulot tafsilotlari sahifasi
│   │   ├── cart/              # Savat sahifasi
│   │   ├── checkout/          # Buyurtma rasmiylashtirish sahifasi
│   │   ├── layout.tsx         # Asosiy layout (Navbar, Footer, CartDrawer)
│   │   └── page.tsx           # Bosh sahifa (Hero, mashhurlar, toifalar)
│   ├── components/            # Qayta ishlatiluvchi UI komponentlar
│   ├── lib/                   # Yordamchi funksiyalar va ma'lumotlar logikasi
│   ├── store/                 # Zustand savat do'koni
│   └── types/                 # TypeScript tiplari
├── .env.example
├── .gitignore
├── LICENSE
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Litsenziya

MIT License.

