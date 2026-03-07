"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItem } from "@/store/cart-slice";
import { useFoodOrderStore } from "@/store/food-order";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Checkout() {
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const hasHydrated = useFoodOrderStore((state) => state._hasHydrated);
  const cart = useFoodOrderStore((state) => state.cart);
  const checkout = useFoodOrderStore((state) => state.checkout);

  const isCartEmpty = cart.length === 0;
  const subtotal = getSubtotal(cart).toFixed(2);

  function handleCheckout() {
    setIsCheckingOut(true);
    checkout();
    router.push("/history");
  }

  if (!hasHydrated) {
    return null;
  }

  // Prevent empty cart flashing
  if (isCheckingOut) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <p className="text-xl font-semibold">Processing your order...</p>
      </div>
    );
  }

  if (isCartEmpty) {
    return null;
  }

  return (
    <div className="py-10 flex justify-end">
      <Card className="w-full max-w-xs">
        <CardHeader>
          <CardTitle>
            Subtotal: $<span data-testid="subtotal">{subtotal}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <Button size="lg" className="w-full" onClick={handleCheckout}>
            Pay Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// helpers
function getSubtotal(cart: CartItem[]) {
  let subtotal = 0;

  for (const { quantity, price } of cart) {
    subtotal += price * quantity;
  }

  return subtotal;
}

export { Checkout };
