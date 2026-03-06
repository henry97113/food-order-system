import { describe, it, expect, beforeEach } from "vitest";
import { useFoodOrderStore } from "./food-order";

describe("Food Order Store - Cart Slice", () => {
  const mockItem = { id: "b1", name: "Classic Burger", price: 5.99 };

  beforeEach(() => {
    // Reset store state before each test
    useFoodOrderStore.setState({
      cart: [],
    });
  });

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
