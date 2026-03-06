"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItem } from "@/store/cart-slice";
import { useFoodOrderStore } from "@/store/food-order";
import { useRouter } from "next/navigation";

function Checkout() {
  const router = useRouter();
  const hasHydrated = useFoodOrderStore((state) => state._hasHydrated);
  const cart = useFoodOrderStore((state) => state.cart);
  const checkout = useFoodOrderStore((state) => state.checkout);

  const isCartEmpty = cart.length === 0;
  const subtotal = getSubtotal(cart).toFixed(2);

  function handleCheckout() {
    // TODO: display an overlay when checking out so that users don't see the flash of "Empty Cart" screen
    checkout();
    router.push("/history");
  }

  if (!hasHydrated || isCartEmpty) {
    return null;
  }

  return (
    <div className="py-10 flex justify-end">
      <Card className="w-full max-w-xs">
        <CardHeader>
          <CardTitle>Subtotal: ${subtotal}</CardTitle>
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
