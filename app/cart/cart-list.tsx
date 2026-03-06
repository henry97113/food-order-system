"use client";

import { Button } from "@/components/ui/button";
import { useFoodOrderStore } from "@/store/food-order";
import Link from "next/link";
import { CartItem } from "./cart-item";

function CartList() {
  const hasHydrated = useFoodOrderStore((state) => state._hasHydrated);
  const cart = useFoodOrderStore((state) => state.cart);
  const isCartEmpty = cart.length === 0;

  if (!hasHydrated) {
    return null;
  }

  if (isCartEmpty) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-40">
        <p>Nothing in cart yet...</p>
        <Button nativeButton={false} render={<Link href="/menu" />}>
          Go pick some food
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
