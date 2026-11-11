'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight,
  Truck
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';

const FREE_SHIPPING_THRESHOLD = 3000000; // 3 000 000 so'm

export function CartDrawer() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { 
    items, 
    isDrawerOpen, 
    closeDrawer, 
    updateQuantity, 
    removeItem, 
    getTotalPrice 
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Escape tugmasi bosilganda yopish
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDrawerOpen, closeDrawer]);

  if (!mounted || !isDrawerOpen) return null;

  const totalPrice = getTotalPrice();
  const diffForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const progressPercent = Math.min(100, Math.round((totalPrice / FREE_SHIPPING_THRESHOLD) * 100));

  const handleCheckout = () => {
    closeDrawer();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={closeDrawer}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Sizning savatingiz
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 font-bold">
                {items.reduce((s, i) => s + i.quantity, 0)} ta
              </span>
            </div>
            <button
              onClick={closeDrawer}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200/60 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              <Truck className="w-4 h-4 text-primary-500 shrink-0" />
              {diffForFree > 0 ? (
                <span>
                  Bepul yetkazish uchun yana <strong className="text-primary-600 dark:text-primary-400">{formatPrice(diffForFree)}</strong> miqdorida xarid qiling
                </span>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  Tabriklaymiz! Siz uchun yetkazib berish bepul! 🎉
                </span>
              )}
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary-500 to-indigo-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-slate-100 dark:divide-slate-800">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Savatingiz hozircha bo&apos;sh
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    O&apos;zingizga ma&apos;qul kelgan quloqchinlarni katalogdan tanlang va savatga qo&apos;shing.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeDrawer();
                    router.push('/catalog');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm shadow-md transition-colors"
                >
                  Katalogga o&apos;tish
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={`${item.product.id}-${item.selectedColor}`}
                  className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center"
                >
                  {/* Thumbnail */}
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl bg-slate-100 dark:bg-slate-800/80 p-2 shrink-0 overflow-hidden border border-slate-200/50 dark:border-slate-800">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Rang: {item.selectedColor}
                        </span>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedColor)}
                        className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                        aria-label="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800/60">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)}
                          className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                          aria-label="Kamaytirish"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)}
                          disabled={item.quantity >= item.product.inStock}
                          className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30 transition-colors"
                          aria-label="Ko'paytirish"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total line item price */}
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Checkout button */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Mahsulotlar narxi:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Yetkazib berish:</span>
                  <span>
                    {diffForFree === 0 ? (
                      <span className="text-emerald-500 font-semibold">Bepul</span>
                    ) : (
                      '35 000 so\'m'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Jami to&apos;lov:</span>
                  <span className="text-primary-600 dark:text-primary-400">
                    {formatPrice(totalPrice + (diffForFree === 0 ? 0 : 35000))}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleCheckout}
                  className="flex-1 py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md shadow-primary-500/25 flex items-center justify-center gap-2 transition-all group"
                >
                  <span>Buyurtmaga o&apos;tish</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-colors text-center"
                >
                  Savat sahifasi
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
