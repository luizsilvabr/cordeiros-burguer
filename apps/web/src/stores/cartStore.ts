// apps/web/src/stores/cartStore.ts
import { create } from "zustand";
import type { CartItem } from "../types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (cartItemId: string) => void;
  incrementItem: (cartItemId: string) => void;
  decrementItem: (cartItemId: string) => void;
  clearCart: () => void;

  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  getItemPrice: (item: CartItem) => number;
  getSubtotal: () => number;
  getTotalQuantity: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) => {
    const newItem: CartItem = {
      ...item,
      id: crypto.randomUUID(),
    };
    set((state) => ({ items: [...state.items, newItem] }));
  },

  removeItem: (cartItemId) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== cartItemId),
    }));
  },

  incrementItem: (cartItemId) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === cartItemId ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    }));
  },

  decrementItem: (cartItemId) => {
    set((state) => ({
      items: state.items
        .map((i) =>
          i.id === cartItemId ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0), // se chegar a 0, remove
    }));
  },

  clearCart: () => set({ items: [] }),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  getItemPrice: (item) => {
    const optionsTotal = item.selectedOptions.reduce(
      (sum, opt) => sum + opt.extraPrice,
      0,
    );
    return (item.basePrice + optionsTotal) * item.quantity;
  },

  getSubtotal: () => {
    const { items, getItemPrice } = get();
    return items.reduce((sum, item) => sum + getItemPrice(item), 0);
  },

  getTotalQuantity: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
