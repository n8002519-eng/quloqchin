'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, 
  ShoppingCart, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Plus, 
  Minus, 
  Share2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { ProductCard } from '@/components/ProductCard';

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0] || product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Standart');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const discount = calculateDiscount(product.price, product.originalPrice);

  const handleAddToCart = () => {
    addItem(product, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center text-xs sm:text-sm text-slate-500 gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-primary-600 transition-colors">Bosh sahifa</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/catalog" className="hover:text-primary-600 transition-colors">Katalog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/catalog?category=${product.category}`} className="hover:text-primary-600 transition-colors">
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-slate-200 font-semibold truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Left: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 flex items-center justify-center overflow-hidden shadow-sm">
            {discount > 0 && (
              <span className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold rounded-xl bg-rose-500 text-white shadow-md">
                -{discount}% Chegirma
              </span>
            )}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-600 transition-colors"
              title="Havolani nusxalash"
              aria-label="Ulashish"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-contain transition-all duration-300"
                priority
              />
            </div>
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, index) => {
                const isActive = selectedImage === img;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-2xl bg-white dark:bg-slate-900 border p-2 shrink-0 transition-all ${
                      isActive 
                        ? 'border-primary-500 ring-2 ring-primary-500/20' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} rasm ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Info & Purchase */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Brand & Stock */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 px-3 py-1 rounded-lg bg-primary-50 dark:bg-primary-950/50">
              {product.brand}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              product.inStock > 0 
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' 
                : 'bg-rose-50 text-rose-600'
            }`}>
              {product.inStock > 0 ? `Omborda mavjud (${product.inStock} dona)` : 'Sotuvda tugagan'}
            </span>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-300 dark:text-slate-700'}`} 
                />
              ))}
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-sm text-slate-500">
              ({product.reviewsCount} ta xaridor sharhi)
            </span>
          </div>

          {/* Price Block */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block">Joriy narx:</span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm sm:text-base text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            {discount > 0 && (
              <span className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-sm">
                Tejovingiz: {formatPrice(product.originalPrice! - product.price)}
              </span>
            )}
          </div>

          {/* Colors Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Rang: <span className="text-slate-900 dark:text-white normal-case">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color;
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        isSelected
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 ring-2 ring-primary-500/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              
              {/* Quantity */}
              <div className="flex items-center justify-between border border-slate-300 dark:border-slate-700 rounded-2xl p-1 bg-white dark:bg-slate-900 w-full sm:w-36 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  aria-label="Kamaytirish"
                >
                  <Minus className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </button>
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
                  disabled={quantity >= product.inStock}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors disabled:opacity-30"
                  aria-label="Ko'paytirish"
                >
                  <Plus className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.inStock === 0}
                className={`flex-1 py-4 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-lg ${
                  isAdded
                    ? 'bg-emerald-500 text-white'
                    : 'bg-primary-600 hover:bg-primary-700 active:scale-98 text-white shadow-primary-500/25'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Savatga qo&apos;shildi!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Savatga qo&apos;shish</span>
                  </>
                )}
              </button>

            </div>

            <Link
              href="/checkout"
              onClick={() => addItem(product, selectedColor, quantity)}
              className="w-full block text-center py-3.5 px-6 rounded-2xl font-bold text-sm border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-colors"
            >
              Bir bosishda sotib olish
            </Link>
          </div>

          {/* Delivery & Warranty perks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
              <Truck className="w-4 h-4 text-primary-500 shrink-0" />
              <span>Tezkor yetkazish</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>1 yil kafolat</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
              <RotateCcw className="w-4 h-4 text-amber-500 shrink-0" />
              <span>14 kunda qaytarish</span>
            </div>
          </div>

        </div>

      </div>

      {/* Description & Technical Specs Tabs / Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6">
        
        {/* Description */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-500" />
            <span>Mahsulot tavsifi</span>
          </h2>
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <p className="whitespace-pre-line">{product.description}</p>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Texnik xususiyatlar
          </h2>
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs sm:text-sm">
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {Object.entries(product.specs).map(([key, value], idx) => (
                  <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-950/30' : ''}>
                    <td className="py-3 px-4 font-semibold text-slate-500 dark:text-slate-400 w-1/2">
                      {key}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100 w-1/2">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-10 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              O&apos;xshash modellar
            </h2>
            <Link
              href={`/catalog?category=${product.category}`}
              className="text-xs sm:text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
            >
              Kategoriyadagi barcha modellar
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
