import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useFoodOrderStore } from "./food-order";

describe("Food Order Store - Cart Slice", () => {
  const mockItem = { id: "b1", name: "Classic Burger", price: 5.99 };

  it("should have an initial empty cart", () => {
    expect(useFoodOrderStore.getState().cart).toEqual([]);
  });

  it("should add a new item to the cart with quantity 1", () => {
    useFoodOrderStore.getState().addToCart(mockItem);

    const cart = useFoodOrderStore.getState().cart;
    expect(cart).toHaveLength(1);
    expect(cart[0]).toEqual({ ...mockItem, quantity: 1 });
  });

  it("should increment quantity if the same item is added again", () => {
    useFoodOrderStore.getState().addToCart(mockItem);
    useFoodOrderStore.getState().addToCart(mockItem);

    const cart = useFoodOrderStore.getState().cart;
    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(2);
  });

  it("should remove an item from the cart", () => {
    useFoodOrderStore.getState().addToCart(mockItem);
    useFoodOrderStore.getState().removeFromCart(mockItem.id);

    expect(useFoodOrderStore.getState().cart).toHaveLength(0);
  });

  it("should update the quantity of an existing item", () => {
    useFoodOrderStore.getState().addToCart(mockItem);
    useFoodOrderStore.getState().updateQuantity(mockItem.id, 5);

    const cart = useFoodOrderStore.getState().cart;
    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(5);
  });

  it("should remove the item if quantity is updated to 0", () => {
    useFoodOrderStore.getState().addToCart(mockItem);
    useFoodOrderStore.getState().updateQuantity(mockItem.id, 0);

    expect(useFoodOrderStore.getState().cart).toHaveLength(0);
  });

  it("should clear the entire cart", () => {
    useFoodOrderStore.getState().addToCart(mockItem);
    useFoodOrderStore
      .getState()
      .addToCart({ id: "s1", name: "Fries", price: 2.99 });

    expect(useFoodOrderStore.getState().cart).toHaveLength(2);

    useFoodOrderStore.getState().clearCart();
    expect(useFoodOrderStore.getState().cart).toHaveLength(0);
  });
});

describe("Food Order Store - History Slice", () => {
  const mockOrder = {
    id: "order-1",
    items: [{ id: "b1", name: "Classic Burger", price: 5.99, quantity: 2 }],
    total: 11.98,
    date: "2024-01-01T12:00:00.000Z",
  };

  it("should have an initial empty order history", () => {
    expect(useFoodOrderStore.getState().orderHistory).toEqual([]);
  });

  it("should add an order to the history", () => {
    useFoodOrderStore.getState().addOrder(mockOrder);

    const history = useFoodOrderStore.getState().orderHistory;
    expect(history).toHaveLength(1);
    expect(history[0]).toEqual(mockOrder);
  });

  it("should add new orders to the beginning of the history", () => {
    const order1 = { ...mockOrder, id: "order-1" };
    const order2 = { ...mockOrder, id: "order-2" };

    useFoodOrderStore.getState().addOrder(order1);
    useFoodOrderStore.getState().addOrder(order2);

    const history = useFoodOrderStore.getState().orderHistory;
    expect(history).toHaveLength(2);
    expect(history[0].id).toBe("order-2");
    expect(history[1].id).toBe("order-1");
  });

  it("should delete an order from the history", () => {
    useFoodOrderStore.getState().addOrder(mockOrder);
    useFoodOrderStore.getState().deleteOrder(mockOrder.id);

    expect(useFoodOrderStore.getState().orderHistory).toHaveLength(0);
  });

  it("should only delete the specified order", () => {
    const order1 = { ...mockOrder, id: "order-1" };
    const order2 = { ...mockOrder, id: "order-2" };

    useFoodOrderStore.getState().addOrder(order1);
    useFoodOrderStore.getState().addOrder(order2);
    useFoodOrderStore.getState().deleteOrder("order-1");

    const history = useFoodOrderStore.getState().orderHistory;
    expect(history).toHaveLength(1);
    expect(history[0].id).toBe("order-2");
  });

  it("should clear the entire order history", () => {
    useFoodOrderStore.getState().addOrder(mockOrder);
    useFoodOrderStore.getState().addOrder({ ...mockOrder, id: "order-2" });

    expect(useFoodOrderStore.getState().orderHistory).toHaveLength(2);

    useFoodOrderStore.getState().clearHistory();
    expect(useFoodOrderStore.getState().orderHistory).toHaveLength(0);
  });
});

describe("Food Order Store - Checkout", () => {
  const mockItem1 = { id: "b1", name: "Classic Burger", price: 5.99 };
  const mockItem2 = { id: "s1", name: "Fries", price: 2.99 };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should create an order and clear the cart", () => {
    useFoodOrderStore.getState().addToCart(mockItem1);
    useFoodOrderStore.getState().addToCart(mockItem2);

    expect(useFoodOrderStore.getState().cart).toHaveLength(2);

    useFoodOrderStore.getState().checkout();

    expect(useFoodOrderStore.getState().cart).toHaveLength(0);
  });

  it("should add the checkout order to order history", () => {
    useFoodOrderStore.getState().addToCart(mockItem1);
    useFoodOrderStore.getState().addToCart(mockItem1);
    useFoodOrderStore.getState().addToCart(mockItem2);

    useFoodOrderStore.getState().checkout();

    const history = useFoodOrderStore.getState().orderHistory;
    expect(history).toHaveLength(1);
  });

  it("should calculate the correct total for the order", () => {
    useFoodOrderStore.getState().addToCart(mockItem1);
    useFoodOrderStore.getState().addToCart(mockItem1);
    useFoodOrderStore.getState().addToCart(mockItem2);

    useFoodOrderStore.getState().checkout();

    const history = useFoodOrderStore.getState().orderHistory;
    expect(history[0].total).toBe(14.97);
  });

  it("should include all cart items in the order", () => {
    useFoodOrderStore.getState().addToCart(mockItem1);
    useFoodOrderStore.getState().addToCart(mockItem2);

    useFoodOrderStore.getState().checkout();

    const history = useFoodOrderStore.getState().orderHistory;
    expect(history[0].items).toHaveLength(2);
    expect(history[0].items).toContainEqual({ ...mockItem1, quantity: 1 });
    expect(history[0].items).toContainEqual({ ...mockItem2, quantity: 1 });
  });

  it("should set the order date to current time", () => {
    useFoodOrderStore.getState().addToCart(mockItem1);

    useFoodOrderStore.getState().checkout();

    const history = useFoodOrderStore.getState().orderHistory;
    expect(history[0].date).toBe("2024-01-01T12:00:00.000Z");
  });

  it("should do nothing when cart is empty", () => {
    useFoodOrderStore.getState().checkout();

    expect(useFoodOrderStore.getState().orderHistory).toHaveLength(0);
    expect(useFoodOrderStore.getState().cart).toHaveLength(0);
  });

  it("should handle multiple checkouts correctly", () => {
    useFoodOrderStore.getState().addToCart(mockItem1);
    useFoodOrderStore.getState().checkout();

    useFoodOrderStore.getState().addToCart(mockItem2);
    useFoodOrderStore.getState().checkout();

    const history = useFoodOrderStore.getState().orderHistory;
    expect(history).toHaveLength(2);
    expect(history[0].items).toHaveLength(1);
    expect(history[0].items[0].id).toBe("s1");
    expect(history[1].items).toHaveLength(1);
    expect(history[1].items[0].id).toBe("b1");
  });
});
