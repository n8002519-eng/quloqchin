import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Narxni O'zbekiston so'mi formatida chiqarish: masalan 1 250 000 so'm
 */
export function formatPrice(price: number): string {
  if (typeof price !== 'number' || isNaN(price)) return '0 so\'m';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' so\'m';
}

/**
 * Chegirma foizini hisoblash
 */
export function calculateDiscount(currentPrice: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Telefon raqamini tozalash va tekshirish
 */
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

export function isValidUzPhone(phone: string): boolean {
  const clean = cleanPhoneNumber(phone);
  // +998 followed by 9 digits
  return /^\+?998[0-9]{9}$/.test(clean);
}
