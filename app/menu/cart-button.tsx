"use client";

import { RiShoppingBagLine } from "@remixicon/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFoodOrderStore } from "@/store/food-order";

function CartButton() {
  const cart = useFoodOrderStore((state) => state.cart);
  const cartAmount = cart.length;

  return (
    <Button
      nativeButton={false}
      render={<Link href="/cart" />}
      aria-label={`Cart items: ${cartAmount}`}
      variant="outline"
    >
      <RiShoppingBagLine aria-hidden />{" "}
      <span aria-hidden className="font-semibold">
        {cartAmount}
      </span>
    </Button>
  );
}

export { CartButton };
