'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Headphones, 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useCartStore } from '@/store/useCartStore';

export function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { items, openDrawer } = useCartStore();
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/catalog');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-primary-600 to-indigo-600 text-white text-xs py-1.5 px-4 text-center font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-2">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Barcha quloqchinlarga 1 yillik rasmiy kafolat va Toshkent bo&apos;ylab 24 soatda yetkazib berish!
          </span>
          <a 
            href="tel:+998901234567" 
            className="hidden sm:inline-flex items-center gap-1 font-semibold hover:underline ml-4"
          >
            <PhoneCall className="w-3 h-3" />
            +998 (90) 123-45-67
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform">
              <Headphones className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center">
                Quloqchin<span className="text-primary-500">.uz</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600 dark:text-slate-400 -mt-1">
                Audio Do&apos;koni
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <Link 
              href="/" 
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Bosh sahifa
            </Link>
            <Link 
              href="/catalog" 
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Katalog
            </Link>
            <Link 
              href="/catalog?category=wireless" 
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Simsiz
            </Link>
            <Link 
              href="/catalog?category=tws" 
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              TWS
            </Link>
            <Link 
              href="/catalog?category=gaming" 
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Gaming
            </Link>
          </nav>

          {/* Search Bar (Desktop) */}
          <form 
            onSubmit={handleSearch} 
            className="hidden lg:flex items-center relative flex-1 max-w-xs"
          >
            <input
              type="text"
              placeholder="Quloqchinlarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          </form>

          {/* Actions: Theme & Cart & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {/* Cart Button */}
            <button
              onClick={openDrawer}
              aria-label="Savatni ochish"
              className="relative p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-primary-50 dark:hover:bg-primary-950/40 hover:text-primary-600 dark:hover:text-primary-400 transition-all border border-slate-200/60 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <ShoppingCart className="w-5 h-5" />
              {mounted && totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary-600 text-white text-[11px] font-bold flex items-center justify-center animate-bounce shadow-md">
                  {totalCount > 99 ? '99+' : totalCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menyuni ochish"
              className="md:hidden p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800 dark:text-slate-100" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Quloqchinlarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          </form>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-1 text-base font-semibold text-slate-700 dark:text-slate-200">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              Bosh sahifa
            </Link>
            <Link
              href="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              Barcha quloqchinlar (Katalog)
            </Link>
            <Link
              href="/catalog?category=wireless"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              Simsiz quloqchinlar
            </Link>
            <Link
              href="/catalog?category=tws"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              TWS (Kichik quloqchinlar)
            </Link>
            <Link
              href="/catalog?category=gaming"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              O&apos;yin uchun (Gaming)
            </Link>
            <Link
              href="/catalog?category=wired"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              Simli va studiya
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center justify-between"
            >
              <span>Savat</span>
              {totalCount > 0 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-primary-600 text-white font-bold">
                  {totalCount} ta
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
