import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useFoodOrderStore } from "@/store/food-order";
import CartPage from "./page";

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
    });
    vi.clearAllMocks();
  });

  it("User should be able to see a list of items added to cart", () => {
    render(<CartPage />);

    const listItems = screen.getAllByRole("listitem");

    expect(
      within(listItems[0]).getByText("Classic Burger"),
    ).toBeInTheDocument();
    expect(within(listItems[0]).getByText("$20.00")).toBeInTheDocument(); // Subtotal for 2 * $10

    expect(within(listItems[1]).getByText("Fries")).toBeInTheDocument();
    expect(within(listItems[1]).getByText("$5.00")).toBeInTheDocument(); // Subtotal for 1 * $5
  });

  it("The page should display the correct subtotal on the bottom of the page", () => {
    render(<CartPage />);
    expect(screen.getByTestId("subtotal")).toHaveTextContent("25.00");
  });

  it("Subtotal should be correct after a sereis of operation", async () => {
    const user = userEvent.setup();
    render(<CartPage />);

    const incrementButtons = screen.getAllByLabelText("Increment");
    const decrementButtons = screen.getAllByLabelText("Decrement");
    await user.click(incrementButtons[1]);
    await user.click(decrementButtons[0]);

    expect(screen.getByTestId("subtotal")).toHaveTextContent("20.00");
  });

  it("User can increase / decrease the amount of the item by clicking the +/- button", async () => {
    const user = userEvent.setup();
    render(<CartPage />);

    const listItems = screen.getAllByRole("listitem");
    const targetItem = listItems[0];
    const incrementButton = within(targetItem).getByLabelText("Increment");
    const decrementButton = within(targetItem).getByLabelText("Decrement");
    const itemQuantity = within(targetItem).getByTestId(
      "cart-item-stepper-quantity",
    );

    expect(itemQuantity).toHaveTextContent("2");

    // Click "+"
    await user.click(incrementButton);
    expect(itemQuantity).toHaveTextContent("3");

    // Click "-"
    await user.click(decrementButton);
    expect(itemQuantity).toHaveTextContent("2");

    // element should be removed if the quantity becomes 0
    await user.click(decrementButton); // 1
    await user.click(decrementButton); // 0
    expect(targetItem).not.toBeInTheDocument();
  });
});
