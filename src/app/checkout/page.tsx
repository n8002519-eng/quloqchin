'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Send, 
  Mail, 
  CheckCircle2, 
  ArrowLeft,
  AlertCircle,
  Banknote,
  Smartphone
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice, isValidUzPhone } from '@/lib/utils';

const CITIES = [
  'Toshkent shahri',
  'Toshkent viloyati',
  'Samarqand viloyati',
  'Farg\'ona viloyati',
  'Andijon viloyati',
  'Namangan viloyati',
  'Buxoro viloyati',
  'Xorazm viloyati',
  'Qashqadaryo viloyati',
  'Surxondaryo viloyati',
  'Navoiy viloyati',
  'Jizzax viloyati',
  'Sirdaryo viloyati',
  'Qoraqalpog\'iston Respublikasi',
];

const FREE_SHIPPING_THRESHOLD = 3000000;

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, getTotalPrice, clearCart } = useCartStore();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '+998 ',
    city: 'Toshkent shahri',
    address: '',
    paymentMethod: 'cash',
    notes: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{
    orderId: string;
    messageText: string;
    telegramSent: boolean;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 text-sm">Yuklanmoqda...</p>
      </div>
    );
  }

  // Agar savat bo'sh bo'lsa va buyurtma hali berilmagan bo'lsa
  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Savatingiz bo&apos;sh</h2>
        <p className="text-sm text-slate-500">Buyurtma berish uchun avval quloqchin tanlang.</p>
        <Link
          href="/catalog"
          className="inline-block px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold text-sm"
        >
          Katalogga o&apos;tish
        </Link>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const isFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = isFreeShipping ? 0 : 35000;
  const finalTotal = totalPrice + shippingFee;

  // Phone input formatting
  const handlePhoneChange = (val: string) => {
    if (!val.startsWith('+998')) {
      val = '+998 ';
    }
    setFormData((prev) => ({ ...prev, phone: val }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errs.fullName = 'Iltimos, to\'liq ismingizni kiriting';
    }

    if (!isValidUzPhone(formData.phone)) {
      errs.phone = 'Telefon raqam noto\'g\'ri (+998 90 123 45 67)';
    }

    if (!formData.address.trim() || formData.address.trim().length < 5) {
      errs.address = 'Yetkazib berish manzilini to\'liqroq kiriting (ko\'cha, uy, xonadon)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const randomOrderId = 'QLQ-' + Math.floor(10000 + Math.random() * 90000);

    const orderPayload = {
      orderId: randomOrderId,
      fullName: formData.fullName,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      paymentMethod:
        formData.paymentMethod === 'cash'
          ? 'Qabul qilganda naqd pul yoki karta'
          : formData.paymentMethod === 'click'
          ? 'Click orqali to\'lov'
          : formData.paymentMethod === 'payme'
          ? 'Payme orqali to\'lov'
          : 'Bank kartasi',
      notes: formData.notes,
      totalPrice: formatPrice(finalTotal),
      shippingFee: shippingFee === 0 ? 'Bepul' : formatPrice(shippingFee),
      items: items.map((i) => ({
        name: i.product.name,
        color: i.selectedColor,
        quantity: i.quantity,
        price: formatPrice(i.product.price),
        total: formatPrice(i.product.price * i.quantity),
      })),
    };

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      const data = await res.json();

      setOrderSuccess({
        orderId: randomOrderId,
        messageText: data.messageText || '',
        telegramSent: !!data.telegramSent,
      });

      // Savatni tozalaymiz
      clearCart();
    } catch (err) {
      console.error(err);
      // Fallback
      setOrderSuccess({
        orderId: randomOrderId,
        messageText: 'Buyurtma saqlandi',
        telegramSent: false,
      });
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Telegramga to'g'ridan-to'g'ri xabar jo'natish havolasi
  const telegramShareUrl = orderSuccess
    ? `https://t.me/share/url?url=${encodeURIComponent(
        'https://quloqchin.uz'
      )}&text=${encodeURIComponent(orderSuccess.messageText)}`
    : '';

  // Mailto havolasi
  const mailtoUrl = orderSuccess
    ? `mailto:orders@quloqchin.uz?subject=${encodeURIComponent(
        `Buyurtma #${orderSuccess.orderId}`
      )}&body=${encodeURIComponent(orderSuccess.messageText)}`
    : '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* SUCCESS MODAL / VIEW */}
      {orderSuccess ? (
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Buyurtma qabul qilindi!
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Rahmat, {formData.fullName}!
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Buyurtma raqamingiz: <strong className="text-slate-900 dark:text-slate-200">#{orderSuccess.orderId}</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 text-xs text-left text-slate-600 dark:text-slate-300 space-y-1">
            <p><strong>Telefon:</strong> {formData.phone}</p>
            <p><strong>Manzil:</strong> {formData.city}, {formData.address}</p>
            <p><strong>To&apos;lov usuli:</strong> {formData.paymentMethod === 'cash' ? 'Qabul qilganda naqd' : 'Online to\'lov'}</p>
            <p className="pt-1 text-slate-500">Operatorimiz tez orada buyurtmani tasdiqlash uchun siz bilan bog&apos;lanadi.</p>
          </div>

          {/* Direct Telegram or Mailto buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={telegramShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Telegram orqali yuborish</span>
            </a>
            <a
              href={mailtoUrl}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email orqali yuborish</span>
            </a>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Bosh sahifaga qaytish</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Checkout Title */}
          <div className="pb-6 mb-8 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Buyurtmani rasmiylashtirish
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Yetkazib berish ma&apos;lumotlari va qulay to&apos;lov turini tanlang
              </p>
            </div>
            <Link
              href="/cart"
              className="text-xs sm:text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Savatga qaytish</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Contact info */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">1</span>
                  <span>Aloqa ma&apos;lumotlari</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      To&apos;liq ismingiz <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Masalan: Sardor Aliyev"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border ${
                        errors.fullName ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                      } text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Telefon raqamingiz <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+998 90 123 45 67"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border ${
                        errors.phone ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                      } text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    />
                    {errors.phone ? (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phone}
                      </p>
                    ) : (
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Format: +998 90 123 45 67
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery address */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">2</span>
                  <span>Yetkazib berish manzili</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Shahar / Viloyat <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      aria-label="Shahar yoki Viloyatni tanlang"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Aniq manzil <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Tuman, ko'cha, uy raqami, xonadon..."
                      value={formData.address}
                      onChange={(e) => {
                        setFormData({ ...formData, address: e.target.value });
                        if (errors.address) setErrors({ ...errors, address: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border ${
                        errors.address ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                      } text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    />
                    {errors.address && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Kuryer uchun izoh (ixtiyoriy)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Masalan: Domofon kodi 45, soat 18:00 dan keyin yetkazish..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment method */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">3</span>
                  <span>To&apos;lov usuli</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3.5 transition-all ${
                      formData.paymentMethod === 'cash'
                        ? 'border-primary-600 bg-primary-50/50 dark:bg-primary-950/40 ring-2 ring-primary-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">Naqd / Karta</div>
                      <div className="text-xs text-slate-500">Qabul qilganda to&apos;lash</div>
                    </div>
                  </label>

                  <label
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3.5 transition-all ${
                      formData.paymentMethod === 'click'
                        ? 'border-primary-600 bg-primary-50/50 dark:bg-primary-950/40 ring-2 ring-primary-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="click"
                      checked={formData.paymentMethod === 'click'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'click' })}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">Click Up</div>
                      <div className="text-xs text-slate-500">Online to&apos;lov tizimi</div>
                    </div>
                  </label>

                  <label
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3.5 transition-all ${
                      formData.paymentMethod === 'payme'
                        ? 'border-primary-600 bg-primary-50/50 dark:bg-primary-950/40 ring-2 ring-primary-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="payme"
                      checked={formData.paymentMethod === 'payme'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'payme' })}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">Payme</div>
                      <div className="text-xs text-slate-500">Ilova orqali to&apos;lov</div>
                    </div>
                  </label>

                  <label
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3.5 transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-primary-600 bg-primary-50/50 dark:bg-primary-950/40 ring-2 ring-primary-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 flex items-center justify-center shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">Uzcard / Humo</div>
                      <div className="text-xs text-slate-500">Karta orqali to&apos;lash</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-primary-600 hover:bg-primary-700 active:scale-98 text-white font-bold text-base shadow-xl shadow-primary-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Buyurtma yuborilmoqda...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Buyurtmani tasdiqlash ({formatPrice(finalTotal)})</span>
                  </>
                )}
              </button>

            </form>

            {/* Sidebar Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-sm sticky top-28">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                  Buyurtmangiz tarkibi ({items.reduce((s, i) => s + i.quantity, 0)} ta)
                </h3>

                {/* Items preview */}
                <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 pr-1">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor}`}
                      className="py-3 first:pt-0 last:pb-0 flex items-center gap-3"
                    >
                      <div className="relative w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-950 p-1 shrink-0 border border-slate-100 dark:border-slate-800">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="56px"
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <h4 className="font-bold text-slate-900 dark:text-white truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-slate-500">
                          {item.selectedColor} • {item.quantity} dona
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculations */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Tovarlar summasi:</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Yetkazib berish:</span>
                    <span className="font-semibold">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-500">Bepul</span>
                      ) : (
                        formatPrice(shippingFee)
                      )}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline text-lg font-black text-slate-900 dark:text-white">
                    <span>Jami to&apos;lov:</span>
                    <span className="text-primary-600 dark:text-primary-400 text-xl">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* Safety Guarantee */}
                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/50 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Xavfsiz xarid kafolati</span>
                  </div>
                  <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400">
                    Siz hech qanday oldindan to&apos;lov qilmasdan ham buyurtma berishingiz va mahsulotni ko&apos;rib to&apos;lashingiz mumkin.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
