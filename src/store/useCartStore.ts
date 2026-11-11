import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem } from '../types';

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (product: Product, selectedColor?: string, quantity?: number) => void;
  removeItem: (productId: string, selectedColor: string) => void;
  updateQuantity: (productId: string, selectedColor: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      addItem: (product: Product, selectedColor?: string, quantity = 1) => {
        const color = selectedColor || product.colors[0] || 'Standart';
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(
          (item) => item.product.id === product.id && item.selectedColor === color
        );

        if (existingIndex > -1) {
          const updated = [...currentItems];
          const newQty = updated[existingIndex].quantity + quantity;
          // Ombor zaxirasidan oshmasin
          updated[existingIndex].quantity = Math.min(newQty, product.inStock);
          set({ items: updated, isDrawerOpen: true });
        } else {
          set({
            items: [
              ...currentItems,
              {
                product,
                quantity: Math.min(quantity, product.inStock),
                selectedColor: color,
              },
            ],
            isDrawerOpen: true,
          });
        }
      },

      removeItem: (productId: string, selectedColor: string) => {
        set({
          items: get().items.filter(
            (item) => !(item.product.id === productId && item.selectedColor === selectedColor)
          ),
        });
      },

      updateQuantity: (productId: string, selectedColor: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedColor);
          return;
        }

        set({
          items: get().items.map((item) => {
            if (item.product.id === productId && item.selectedColor === selectedColor) {
              return {
                ...item,
                quantity: Math.min(quantity, item.product.inStock),
              };
            }
            return item;
          }),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'quloqchin_cart_v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
