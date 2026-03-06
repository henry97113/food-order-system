import { StateCreator } from "zustand";
import { CartItem } from "./cart-slice";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
}

export interface HistorySlice {
  orderHistory: Order[];
  addOrder: (order: Order) => void;
  deleteOrder: (orderId: string) => void;
  clearHistory: () => void;
}

export const createHistorySlice: StateCreator<
  HistorySlice,
  [],
  [],
  HistorySlice
> = (set) => ({
  orderHistory: [],
  addOrder: (order) =>
    set((state) => ({
      orderHistory: [order, ...state.orderHistory],
    })),
  deleteOrder: (orderId) =>
    set((state) => ({
      orderHistory: state.orderHistory.filter((order) => order.id !== orderId),
    })),
  clearHistory: () => set({ orderHistory: [] }),
});
