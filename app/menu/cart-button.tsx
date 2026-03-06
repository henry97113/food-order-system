"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFoodOrderStore } from "@/store/food-order";
import { RiShoppingBagLine } from "@remixicon/react";
import Link from "next/link";

function CartButton() {
  const cart = useFoodOrderStore((state) => state.cart);
  const hasHydrated = useFoodOrderStore((state) => state._hasHydrated);
  const cartAmount = cart.length;

  if (!hasHydrated) {
    return <Skeleton className="h-8 w-14" />;
  }

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
