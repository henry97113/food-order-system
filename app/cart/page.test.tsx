import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartPage from "./page";
import { useFoodOrderStore } from "@/store/food-order";

// Mock next/navigation
const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const mockItems = [
  {
    id: "1",
    name: "Classic Burger",
    price: 10,
    category: "Mains",
    quantity: 2,
  },
  { id: "2", name: "Fries", price: 5, category: "Sides", quantity: 1 },
];

describe("Cart Page Integration", () => {
  beforeEach(() => {
    useFoodOrderStore.setState({
      cart: mockItems,
      orderHistory: [],
      _hasHydrated: true,
    });
    vi.clearAllMocks();
  });

  it("User should be able to see a list of items added to cart", () => {
    render(<CartPage />);

    expect(screen.getByText("Classic Burger")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument(); // Subtotal for 2 * $10

    expect(screen.getByText("Fries")).toBeInTheDocument();
    expect(screen.getByText("$5.00")).toBeInTheDocument(); // Subtotal for 1 * $5
  });

  it("The page should display the correct subtotal on the bottom of the page", () => {
    render(<CartPage />);
    expect(screen.getByTestId("subtotal")).toHaveTextContent("25.00");
  });

  it("Subtotal should be correct after a sereis of operation", async () => {
    const user = userEvent.setup();
    render(<CartPage />);

    const incrementButtons = screen.getAllByLabelText(
      "Increment the cart item count",
    );
    const decrementButtons = screen.getAllByLabelText(
      "Decrement the cart item count",
    );
    await user.click(incrementButtons[1]);
    await user.click(decrementButtons[0]);

    expect(screen.getByTestId("subtotal")).toHaveTextContent("20.00");
  });

  it("User can delete a cart item by clicking 'Remove' button on that item", async () => {
    const user = userEvent.setup();
    render(<CartPage />);

    const removeButtons = screen.getAllByRole("button", { name: "Remove" });
    await user.click(removeButtons[0]);

    expect(screen.queryByText("Classic Burger")).not.toBeInTheDocument();
    expect(screen.getByText("Fries")).toBeInTheDocument();
  });

  it("User can increase / decrease the amount of the item by clicking the +/- button or modify the input directly", async () => {
    const user = userEvent.setup();
    render(<CartPage />);

    const incrementButtons = screen.getAllByLabelText(
      "Increment the cart item count",
    );
    const decrementButtons = screen.getAllByLabelText(
      "Decrement the cart item count",
    );
    const quantityInputs = screen.getAllByLabelText("Quantity");

    expect(quantityInputs[0]).toHaveValue("2");

    // Click "+"
    await user.click(incrementButtons[0]);
    expect(quantityInputs[0]).toHaveValue("3");

    // Click "-"
    await user.click(decrementButtons[0]);
    expect(quantityInputs[0]).toHaveValue("2");

    // Modify input directly
    fireEvent.change(quantityInputs[0], { target: { value: "5" } });
    expect(quantityInputs[0]).toHaveValue("5");
  });

  it("When the user clicks the 'Pay now' button, an order should be created and the cart should be cleared", async () => {
    const user = userEvent.setup();

    render(<CartPage />);

    const payNowButton = screen.getByRole("button", { name: "Pay Now" });
    await user.click(payNowButton);

    expect(pushMock).toHaveBeenCalledWith("/history");
  });
});
