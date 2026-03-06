"use client";

import { RiAddLine, RiSubtractLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
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
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(quantity.toString());
  const updateQuantity = useFoodOrderStore((state) => state.updateQuantity);
  const removeFromCart = useFoodOrderStore((state) => state.removeFromCart);
  const subTotal = price * quantity;

  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;

    if (Number.isNaN(Number(val))) {
      return;
    }

    setInputValue(val);

    if (val === "") {
      return;
    }

    const num = parseInt(val, 10);
    if (Number.isNaN(num) || num <= 0) {
      return;
    }

    updateQuantity(id, num);
  }

  function openConfirmDialog() {
    setIsOpen(true);
  }

  function increment() {
    updateQuantity(id, quantity + 1);
  }

  function decrement() {
    if (quantity === 1) {
      openConfirmDialog();
      return;
    }
    updateQuantity(id, quantity - 1);
  }

  function handleBlur() {
    const parsed = parseInt(inputValue, 10);
    if (inputValue === "" || Number.isNaN(parsed) || parsed <= 0) {
      setInputValue(quantity.toString());
    }
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
              aria-label="Decrement the cart item count"
              onClick={decrement}
            >
              <RiSubtractLine aria-hidden />
            </Button>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              role="spinbutton"
              aria-valuenow={quantity}
              className="w-14 text-center"
              value={inputValue}
              onChange={handleQuantityChange}
              onBlur={handleBlur}
              aria-label="Quantity"
            />
            <Button
              variant="outline"
              size="icon"
              aria-label="Increment the cart item count"
              onClick={increment}
            >
              <RiAddLine aria-hidden />
            </Button>
          </ButtonGroup>
          <Button variant="destructive" onClick={() => removeFromCart(id)}>
            Remove
          </Button>
        </ItemActions>
      </Item>

      <AlertDialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to remove this?
            </AlertDialogTitle>
            <AlertDialogDescription>{name}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => removeFromCart(id)}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export { CartItem };
