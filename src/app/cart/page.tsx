'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  ArrowLeft 
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';

const FREE_SHIPPING_THRESHOLD = 3000000;

export default function CartPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    getTotalPrice 
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 text-sm">Savat yuklanmoqda...</p>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const isFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = isFreeShipping || totalPrice === 0 ? 0 : 35000;
  const finalTotal = totalPrice + shippingFee;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Savatingiz bo&apos;sh
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-2">
            Hozircha savatga hech qanday quloqchin qo&apos;shmadingiz. Eng yangi modellarni ko&apos;rib chiqing va xarid qilishni boshlang!
          </p>
        </div>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-lg shadow-primary-500/25 transition-all"
        >
          <span>Katalogga o&apos;tish</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Xaridlar savati
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Savatingizda {items.reduce((s, i) => s + i.quantity, 0)} ta quloqchin mavjud
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Savatni tozalash</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Products List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedColor}`}
              className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-sm"
            >
              {/* Image */}
              <Link
                href={`/products/${item.product.id}`}
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-50 dark:bg-slate-950 p-2 shrink-0 border border-slate-100 dark:border-slate-800"
              >
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  sizes="112px"
                  className="object-contain p-2"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left min-w-0">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                  {item.product.brand}
                </span>
                <Link
                  href={`/products/${item.product.id}`}
                  className="block font-bold text-slate-900 dark:text-white text-base hover:text-primary-600 transition-colors truncate"
                >
                  {item.product.name}
                </Link>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                  Rang: <strong className="text-slate-700 dark:text-slate-300">{item.selectedColor}</strong>
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white block mt-2 sm:hidden">
                  {formatPrice(item.product.price)} dona
                </span>
              </div>

              {/* Quantity Controller */}
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800/80 shrink-0">
                <button
                  onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  aria-label="Kamaytirish"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-slate-900 dark:text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)}
                  disabled={item.quantity >= item.product.inStock}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30 transition-colors"
                  aria-label="Ko'paytirish"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Price total */}
              <div className="text-right shrink-0 min-w-[120px]">
                <div className="text-base font-black text-slate-900 dark:text-white">
                  {formatPrice(item.product.price * item.quantity)}
                </div>
                <div className="text-xs text-slate-400">
                  {formatPrice(item.product.price)} / dona
                </div>
              </div>

              {/* Delete button */}
              <button
                onClick={() => removeItem(item.product.id, item.selectedColor)}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shrink-0"
                aria-label="O'chirish"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          <div className="pt-4">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Xarid qilishni davom ettirish</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-sm sticky top-28">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Buyurtma xulosasi
            </h3>

            {/* Delivery Banner */}
            <div className="p-3.5 rounded-2xl bg-primary-50/70 dark:bg-primary-950/40 border border-primary-200/60 dark:border-primary-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
              <Truck className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
              <div>
                {isFreeShipping ? (
                  <span>Siz uchun Toshkent va barcha viloyatlarga <strong>bepul yetkazib berish</strong> amal qiladi!</span>
                ) : (
                  <span>
                    Yana <strong>{formatPrice(FREE_SHIPPING_THRESHOLD - totalPrice)}</strong> lik xarid qiling va yetkazib berish <strong>bepul</strong> bo&apos;ladi!
                  </span>
                )}
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Mahsulotlar summasi:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Yetkazib berish:</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-500 font-bold">Bepul</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline text-lg font-black text-slate-900 dark:text-white">
                <span>Jami to&apos;lov:</span>
                <span className="text-primary-600 dark:text-primary-400 text-xl">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => router.push('/checkout')}
              className="w-full py-4 px-6 rounded-2xl bg-primary-600 hover:bg-primary-700 active:scale-98 text-white font-bold text-base shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>Rasmiylashtirishga o&apos;tish</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Perks */}
            <div className="pt-2 text-xs text-slate-500 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>1 yillik rasmiy servis kafolati</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary-500" />
                <span>Tezkor yetkazish va mahsulotni tekshirish imkoni</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
