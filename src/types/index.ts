export type ProductCategory = 'wireless' | 'wired' | 'tws' | 'gaming';

export interface ProductSpecs {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: number;
  isPopular?: boolean;
  isNew?: boolean;
  image: string;
  images: string[];
  description: string;
  colors: string[];
  specs: ProductSpecs;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface OrderFormValues {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: 'cash' | 'click' | 'payme' | 'card';
  notes?: string;
}
