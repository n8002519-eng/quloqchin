'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Check, Zap } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const discount = calculateDiscount(product.price, product.originalPrice);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(product, product.colors[0], 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-primary-500/50 dark:hover:border-primary-500/50 shadow-sm hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 overflow-hidden">
      
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {discount > 0 && (
          <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-500 text-white shadow-sm flex items-center gap-1">
            <Zap className="w-3 h-3 fill-white" />
            -{discount}%
          </span>
        )}
        {product.isNew && (
          <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-500 text-white shadow-sm">
            Yangi
          </span>
        )}
      </div>

      {/* Product Image */}
      <Link 
        href={`/products/${product.id}`}
        className="relative block w-full aspect-square p-6 bg-slate-50 dark:bg-slate-950/40 overflow-hidden group-hover:bg-slate-100/60 dark:group-hover:bg-slate-900/60 transition-colors"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300 ease-out"
          priority={false}
        />
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1.5">
          <span className="font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            {product.brand}
          </span>
          <span>{product.categoryName}</span>
        </div>

        {/* Title */}
        <Link 
          href={`/products/${product.id}`}
          className="font-bold text-slate-900 dark:text-white text-base line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center text-amber-400">
            <Star className="w-4 h-4 fill-amber-400" />
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-xs text-slate-600 dark:text-slate-400">
            ({product.reviewsCount})
          </span>
          <span className="mx-1 text-slate-300 dark:text-slate-700">•</span>
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
            {product.inStock > 5 ? 'Omborda mavjud' : `Faqat ${product.inStock} ta qoldi`}
          </span>
        </div>

        {/* Spacer */}
        <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          {/* Price */}
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            disabled={product.inStock === 0}
            aria-label="Savatga qo'shish"
            className={`p-2.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center shrink-0 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              isAdded
                ? 'bg-emerald-500 text-white scale-95'
                : 'bg-primary-600 hover:bg-primary-700 active:scale-95 text-white shadow-md shadow-primary-500/20'
            }`}
            title="Savatga qo'shish"
          >
            {isAdded ? (
              <Check className="w-5 h-5 animate-scale-check" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
