import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MenuItem } from "./menu-item";

describe("MenuItem", () => {
  it("displays the item name and price correctly", () => {
    const itemProps = {
      id: "1",
      name: "Burger",
      price: 10.99,
    };

    render(<MenuItem {...itemProps} />);

    const nameElement = screen.getByTestId("menu-item-name");
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent("Burger");

    const priceElement = screen.getByTestId("menu-item-price");
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveTextContent("$10.99");
  });
});
