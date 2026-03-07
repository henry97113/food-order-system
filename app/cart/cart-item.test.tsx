import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartItem } from "./cart-item";

describe("CartItem Component", () => {
  it("should display the item name and subtotal correctly", () => {
    render(<CartItem id="1" name="Burger" price={10} quantity={2} />);

    // Check Name
    expect(screen.getByText("Burger")).toBeInTheDocument();

    // Check Subtotal (price * quantity = 10 * 2 = 20)
    // The component formats it as `$20.00`
    expect(screen.getByTestId("cart-item-subtotal")).toHaveTextContent(
      "$20.00",
    );
  });
});
