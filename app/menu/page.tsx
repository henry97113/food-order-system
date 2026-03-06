import { MENU } from "@/constants/menu";
import { MenuItem } from "./menu-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CartButton } from "./cart-button";

export default function MenuPage() {
  return (
    <div>
      <header className="flex justify-between items-center pb-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-balance py-4">
          The Burger Joint
        </h1>
        <CartButton />
      </header>
      <div className="space-y-4">
        {MENU.map(({ category, items }, index) => (
          <div key={index}>
            <h2 className="text-2xl font-semibold tracking-tight pb-2">
              {category}
            </h2>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
              role="list"
            >
              {items.map((item) => (
                <MenuItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="py-8 flex justify-end">
        <Button size="lg" nativeButton={false} render={<Link href="/cart" />}>
          Go to Checkout
        </Button>
      </div>
    </div>
  );
}
