import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrderItem } from "./order-item";
import type { Order } from "@/store/history-slice";

const mockOrder: Order = {
  id: "1234567890abcdef",
  items: [
    {
      id: "1",
      name: "Burger",
      price: 10,
      quantity: 2,
    },
    {
      id: "2",
      name: "Fries",
      price: 5,
      quantity: 1,
    },
  ],
  total: 25,
  date: "2026-01-01T20:00:00.000Z",
};

describe("OrderItem Component", () => {
  it("Order item should display the time, items and total amount paid correctly", () => {
    render(<OrderItem {...mockOrder} />);

    // Check Order ID
    expect(screen.getByTestId("order-item-id")).toHaveTextContent("12345678");

    // Check Time
    expect(screen.getByTestId("order-item-time")).toHaveTextContent(
      "1/2/2026, 4:00:00 AM",
    );

    // Check Items
    expect(screen.getByTestId("order-item-entries").children).toHaveLength(2);

    // Check Total Amount Paid
    expect(screen.getByTestId("order-item-subtotal")).toHaveTextContent("25");
  });
});
