import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useFoodOrderStore } from "@/store/food-order";
import { Checkout } from "./checkout";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Checkout Component", () => {
  it("should calculate and display the correct subtotal for multiple items", () => {
    useFoodOrderStore.setState({
      cart: [
        { id: "1", name: "Burger", price: 10.5, quantity: 2 }, // 21.00
        { id: "2", name: "Fries", price: 3.25, quantity: 3 }, // 9.75
      ], // total: 30.75
    });

    render(<Checkout />);

    expect(screen.getByTestId("subtotal")).toHaveTextContent("30.75");
  });

  it("should calculate and display the correct subtotal for a single item", () => {
    useFoodOrderStore.setState({
      cart: [
        { id: "1", name: "Burger", price: 10.5, quantity: 1 }, // 10.50
      ],
    });

    render(<Checkout />);

    expect(screen.getByTestId("subtotal")).toHaveTextContent("10.50");
  });
});
