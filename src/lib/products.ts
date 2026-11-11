import productsData from '../../data/products.json';
import { Product, FilterState } from '../types';

export const products: Product[] = (productsData as unknown) as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getPopularProducts(limit: number = 4): Product[] {
  return products.filter((p) => p.isPopular).slice(0, limit);
}

export function getNewArrivals(limit: number = 4): Product[] {
  return products.filter((p) => p.isNew || p.rating >= 4.9).slice(0, limit);
}

export function getRelatedProducts(currentId: string, category: string, limit: number = 4): Product[] {
  return products
    .filter((p) => p.id !== currentId && p.category === category)
    .slice(0, limit);
}

export function getCategories(): { id: string; name: string; count: number; icon: string }[] {
  const cats = [
    { id: 'all', name: 'Barcha quloqchinlar', count: products.length, icon: 'Headphones' },
    { id: 'wireless', name: 'Simsiz (Wireless)', count: products.filter((p) => p.category === 'wireless').length, icon: 'Wifi' },
    { id: 'tws', name: 'TWS (In-Ear)', count: products.filter((p) => p.category === 'tws').length, icon: 'Radio' },
    { id: 'gaming', name: 'O\'yin uchun (Gaming)', count: products.filter((p) => p.category === 'gaming').length, icon: 'Gamepad2' },
    { id: 'wired', name: 'Simli / Studiya', count: products.filter((p) => p.category === 'wired').length, icon: 'Cable' },
  ];
  return cats;
}

export function getBrands(): string[] {
  const brandsSet = new Set<string>();
  products.forEach((p) => brandsSet.add(p.brand));
  return Array.from(brandsSet).sort();
}

export function getPriceBounds(): { min: number; max: number } {
  const prices = products.map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export function filterAndSortProducts(
  items: Product[],
  filters: FilterState
): Product[] {
  return items
    .filter((product) => {
      // Qidiruv
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchDesc) return false;
      }

      // Kategoriya
      if (filters.category && filters.category !== 'all') {
        if (product.category !== filters.category) return false;
      }

      // Brend
      if (filters.brand && filters.brand !== 'all') {
        if (product.brand.toLowerCase() !== filters.brand.toLowerCase()) return false;
      }

      // Narx oralig'i
      if (filters.minPrice > 0 && product.price < filters.minPrice) return false;
      if (filters.maxPrice > 0 && product.price > filters.maxPrice) return false;

      // Omborda borligi
      if (filters.inStockOnly && product.inStock <= 0) return false;

      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'popular':
        default:
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.rating - a.rating;
      }
    });
}
