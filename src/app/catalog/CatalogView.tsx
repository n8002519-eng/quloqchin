'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  SlidersHorizontal, 
  X, 
  ArrowUpDown, 
  Frown, 
  RotateCcw,
  Headphones
} from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { FilterBar } from '@/components/FilterBar';
import { 
  products, 
  getCategories, 
  getBrands, 
  getPriceBounds, 
  filterAndSortProducts 
} from '@/lib/products';
import { FilterState } from '@/types';

export function CatalogView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = useMemo(() => getCategories(), []);
  const brands = useMemo(() => getBrands(), []);
  const priceBounds = useMemo(() => getPriceBounds(), []);

  // Initial filter state from URL params
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: searchParams?.get('q') || '',
    category: searchParams?.get('category') || 'all',
    brand: searchParams?.get('brand') || 'all',
    minPrice: Number(searchParams?.get('minPrice')) || priceBounds.min,
    maxPrice: Number(searchParams?.get('maxPrice')) || priceBounds.max,
    inStockOnly: searchParams?.get('inStock') === 'true',
    sortBy: (searchParams?.get('sort') as any) || 'popular',
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL search params
  useEffect(() => {
    const q = searchParams?.get('q');
    const category = searchParams?.get('category');
    const brand = searchParams?.get('brand');
    
    setFilters((prev) => ({
      ...prev,
      searchQuery: q !== null ? q : prev.searchQuery,
      category: category || prev.category,
      brand: brand || prev.brand,
    }));
  }, [searchParams]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, filters);
  }, [filters]);

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      brand: 'all',
      minPrice: priceBounds.min,
      maxPrice: priceBounds.max,
      inStockOnly: false,
      sortBy: 'popular',
    });
    router.push('/catalog');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Headphones className="w-7 h-7 text-primary-600" />
            <span>Quloqchinlar Katalogi</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {filteredProducts.length} ta mahsulot topildi
            {filters.category !== 'all' && ` • ${categories.find(c => c.id === filters.category)?.name}`}
            {filters.brand !== 'all' && ` • Brend: ${filters.brand}`}
          </p>
        </div>

        {/* Sort & Mobile filter trigger */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-primary-500" />
            <span>Filtr</span>
          </button>

          {/* Sort Select */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 shadow-sm">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              aria-label="Mahsulotlarni saralash"
              className="bg-transparent text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer py-1"
            >
              <option value="popular">Eng ommabop</option>
              <option value="price-asc">Narx: arzondan qimmatga</option>
              <option value="price-desc">Narx: qimmatdan arzonga</option>
              <option value="rating">Yuqori reyting</option>
              <option value="newest">Yangi kelganlar</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Product list */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28">
            <FilterBar
              filters={filters}
              onChange={setFilters}
              categories={categories}
              brands={brands}
              priceBounds={priceBounds}
              onReset={handleReset}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <Frown className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Hech narsa topilmadi
                </h3>
                <p className="text-sm text-slate-500 max-w-sm mt-1">
                  Kiritilgan mezonlar yoki qidiruv so&apos;zi bo&apos;yicha birorta mahsulot topilmadi. Filtrlarni o&apos;zgartirib ko&apos;ring.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-colors shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Barcha filtrlarni tozalash</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div 
            onClick={() => setMobileFilterOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white dark:bg-slate-900 shadow-2xl flex flex-col">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h2 className="font-bold text-slate-900 dark:text-white">Filtrlar</h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <FilterBar
                  filters={filters}
                  onChange={setFilters}
                  categories={categories}
                  brands={brands}
                  priceBounds={priceBounds}
                  onReset={handleReset}
                />
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md"
                >
                  Natijalarni ko&apos;rish ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
