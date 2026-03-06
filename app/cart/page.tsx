import { Button } from "@/components/ui/button";
import { CartList } from "./cart-list";
import Link from "next/link";
import { Checkout } from "./checkout";

export default function CartPage() {
  return (
    <div>
      <header className="flex justify-between items-center pb-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-balance py-4">
          Shopping Cart
        </h1>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/menu" />}
        >
          Back to Menu
        </Button>
      </header>
      <CartList />
      <Checkout />
    </div>
  );
}
