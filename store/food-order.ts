import { create } from "zustand";
import { CartSlice, createCartSlice } from "./cart-slice";
import { HistorySlice, createHistorySlice } from "./history-slice";

export interface FoodOrderStore extends CartSlice, HistorySlice {
  checkout: () => void;
}

export const useFoodOrderStore = create<FoodOrderStore>()((set, get, api) => ({
  ...createCartSlice(set, get, api),
  ...createHistorySlice(set, get, api),
  checkout: () => {
    const { cart, addOrder, clearCart } = get();

    if (cart.length === 0) return;

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const newOrder = {
      id: crypto.randomUUID(),
      items: [...cart],
      total,
      date: new Date().toISOString(),
    };

    addOrder(newOrder);
    clearCart();
  },
}));
