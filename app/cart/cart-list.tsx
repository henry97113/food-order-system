"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFoodOrderStore } from "@/store/food-order";
import { CartItem } from "./cart-item";

function CartList() {
  const cart = useFoodOrderStore((state) => state.cart);
  const isCartEmpty = cart.length === 0;

  if (isCartEmpty) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-40 sm:h-60">
        <p>Nothing in cart yet...</p>
        <Button nativeButton={false} render={<Link href="/menu" />}>
          Go shopping
        </Button>
      </div>
    );
  }

  return (
    <div role="list" className="space-y-4">
      {cart.map((cartItem) => (
        <CartItem key={cartItem.id} {...cartItem} />
      ))}
    </div>
  );
}

export { CartList };
