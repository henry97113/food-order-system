"use client";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { CartItem } from "@/store/cart-slice";
import { useFoodOrderStore } from "@/store/food-order";
import { QuantityStepper } from "./quantity-stepper";

function CartItem({ id, name, price, quantity }: CartItem) {
  const updateQuantity = useFoodOrderStore((state) => state.updateQuantity);

  const subTotal = price * quantity;

  return (
    <>
      <Item
        variant="outline"
        role="listitem"
        className="flex-col items-start sm:flex-row sm:items-center"
      >
        <ItemContent>
          <ItemTitle>{name}</ItemTitle>
          <ItemDescription data-testid="cart-item-subtotal">
            ${subTotal.toFixed(2)}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <QuantityStepper
            initialValue={quantity}
            onValueChange={(val) => updateQuantity(id, val)}
          />
        </ItemActions>
      </Item>
    </>
  );
}

export { CartItem };
