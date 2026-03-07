"use client";

import { RiAddLine, RiDeleteBinLine, RiSubtractLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { CartItem } from "@/store/cart-slice";
import { useFoodOrderStore } from "@/store/food-order";

function CartItem({ id, name, price, quantity }: CartItem) {
  const updateQuantity = useFoodOrderStore((state) => state.updateQuantity);

  const subTotal = price * quantity;

  function increment() {
    updateQuantity(id, quantity + 1);
  }

  function decrement() {
    updateQuantity(id, quantity - 1);
  }

  return (
    <>
      <Item
        variant="outline"
        role="listitem"
        className="flex-col items-start sm:flex-row sm:items-center"
      >
        <ItemContent>
          <ItemTitle>{name}</ItemTitle>
          <ItemDescription>${subTotal.toFixed(2)}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ButtonGroup>
            <Button
              variant="outline"
              size="icon"
              aria-label="Decrement"
              onClick={decrement}
            >
              {quantity <= 1 ? <RiDeleteBinLine /> : <RiSubtractLine />}
            </Button>
            <ButtonGroupText
              data-testid="cart-item-stepper-quantity"
              className="w-10 justify-center"
            >
              {quantity}
            </ButtonGroupText>
            <Button
              variant="outline"
              size="icon"
              aria-label="Increment"
              onClick={increment}
            >
              <RiAddLine />
            </Button>
          </ButtonGroup>
        </ItemActions>
      </Item>
    </>
  );
}

export { CartItem };
