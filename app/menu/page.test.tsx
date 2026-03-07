import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { MENU } from "@/constants/menu";
import { useFoodOrderStore } from "@/store/food-order";
import MenuPage from "./page";

describe("Menu Page Integration", () => {
  beforeEach(() => {
    useFoodOrderStore.setState({
      cart: [],
    });
  });

  it("should correctly display menu items", () => {
    render(<MenuPage />);

    // Check title
    expect(
      screen.getByRole("heading", { name: /The Burger Joint/i }),
    ).toBeInTheDocument();

    // Check categories and items from the MENU constant
    for (const category of MENU) {
      expect(
        screen.getByRole("heading", { name: category.category }),
      ).toBeInTheDocument();

      for (const item of category.items) {
        expect(screen.getByText(item.name)).toBeInTheDocument();
        const priceElements = screen.getAllByText(`$${item.price}`);
        expect(priceElements.length).toBeGreaterThan(0);
      }
    }
  });

  it("should add a menu item to the cart and reflect the correct number on the Cart Button", async () => {
    const user = userEvent.setup();
    render(<MenuPage />);

    // Cart button should initially show 0 items
    const cartButton = screen.getByRole("button", { name: /Cart items: 0/i });
    expect(cartButton).toBeInTheDocument();

    // Find the first item to add (e.g., Classic Burger)
    const addToCartButtons = screen.getAllByRole("button", {
      name: /Add to Cart/i,
    });
    const firstAddToCartButton = addToCartButtons[0];

    // Click "Add to Cart"
    await user.click(firstAddToCartButton);

    // Verify the cart button reflects 1 item
    expect(
      screen.getByRole("button", { name: /Cart items: 1/i }),
    ).toBeInTheDocument();
  });

  it("should maintain the correct cart number when adding multiple items", async () => {
    const user = userEvent.setup();
    render(<MenuPage />);

    const addToCartButtons = screen.getAllByRole("button", {
      name: /Add to Cart/i,
    });

    // Add first item
    await user.click(addToCartButtons[0]);
    expect(
      screen.getByRole("button", { name: /Cart items: 1/i }),
    ).toBeInTheDocument();

    // Add second, different item
    await user.click(addToCartButtons[1]);
    // Cart length is based on unique items (`cart.length` in cart-button.tsx)
    expect(
      screen.getByRole("button", { name: /Cart items: 2/i }),
    ).toBeInTheDocument();

    // Add first item again (increases quantity, but cart array length remains 2)
    await user.click(addToCartButtons[0]);
    expect(
      screen.getByRole("button", { name: /Cart items: 2/i }),
    ).toBeInTheDocument();
  });
});
