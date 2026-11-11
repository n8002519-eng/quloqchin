'use client';

import { 
  Filter, 
  RotateCcw, 
  Search, 
  Check, 
  SlidersHorizontal 
} from 'lucide-react';
import { FilterState } from '@/types';
import { formatPrice } from '@/lib/utils';

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  categories: { id: string; name: string; count: number }[];
  brands: string[];
  priceBounds: { min: number; max: number };
  onReset: () => void;
}

export function FilterBar({
  filters,
  onChange,
  categories,
  brands,
  priceBounds,
  onReset,
}: FilterBarProps) {

  const handleCategoryChange = (catId: string) => {
    onChange({ ...filters, category: catId });
  };

  const handleBrandChange = (brand: string) => {
    onChange({ ...filters, brand: filters.brand === brand ? 'all' : brand });
  };

  const handlePriceChange = (min: number, max: number) => {
    onChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const isFiltered = 
    filters.category !== 'all' || 
    filters.brand !== 'all' || 
    filters.searchQuery !== '' || 
    filters.inStockOnly || 
    filters.minPrice > priceBounds.min || 
    filters.maxPrice < priceBounds.max;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-6 shadow-sm">
      
      {/* Title & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <SlidersHorizontal className="w-5 h-5 text-primary-500" />
          <span>Filtrlar</span>
        </div>
        {isFiltered && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Tozalash
          </button>
        )}
      </div>

      {/* Search within catalog */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
          Model yoki so&apos;z bo&apos;yicha
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Masalan: Sony, AirPods..."
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
          Kategoriyalar
        </label>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  isSelected 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brands */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
          Brendlar
        </label>
        <div className="flex flex-wrap gap-1.5">
          {brands.map((brand) => {
            const isSelected = filters.brand.toLowerCase() === brand.toLowerCase();
            return (
              <button
                key={brand}
                onClick={() => handleBrandChange(brand)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-primary-500'
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
          Narx oralig&apos;i
        </label>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <span className="text-[10px] text-slate-600 dark:text-slate-400">Dan:</span>
              <input
                type="number"
                min={priceBounds.min}
                max={filters.maxPrice}
                step={100000}
                value={filters.minPrice}
                onChange={(e) => handlePriceChange(Number(e.target.value), filters.maxPrice)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="flex-1">
              <span className="text-[10px] text-slate-600 dark:text-slate-400">Gacha:</span>
              <input
                type="number"
                min={filters.minPrice}
                max={priceBounds.max}
                step={100000}
                value={filters.maxPrice}
                onChange={(e) => handlePriceChange(filters.minPrice, Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex flex-col gap-1 text-xs">
            <button
              onClick={() => handlePriceChange(0, 2000000)}
              className="text-left py-1 text-slate-500 hover:text-primary-600 transition-colors"
            >
              2 000 000 so&apos;mgacha
            </button>
            <button
              onClick={() => handlePriceChange(2000000, 4000000)}
              className="text-left py-1 text-slate-500 hover:text-primary-600 transition-colors"
            >
              2 000 000 — 4 000 000 so&apos;m
            </button>
            <button
              onClick={() => handlePriceChange(4000000, priceBounds.max)}
              className="text-left py-1 text-slate-500 hover:text-primary-600 transition-colors"
            >
              4 000 000 so&apos;mdan yuqori
            </button>
          </div>
        </div>
      </div>

      {/* Stock toggle */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
          />
          <span>Faqat omborda mavjudlarini ko&apos;rsatish</span>
        </label>
      </div>

    </div>
  );
}
