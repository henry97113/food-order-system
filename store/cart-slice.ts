import { StateCreator } from "zustand";
import { MenuItem } from "@/types/menu";

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface CartSlice {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

export const createCartSlice: StateCreator<CartSlice, [], [], CartSlice> = (
  set,
) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id,
      );
      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    })),
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      cart:
        quantity === 0
          ? state.cart.filter((item) => item.id !== itemId)
          : state.cart.map((item) =>
              item.id === itemId ? { ...item, quantity } : item,
            ),
    })),
  clearCart: () => set({ cart: [] }),
});
