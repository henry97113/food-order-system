"use client";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useFoodOrderStore } from "@/store/food-order";
import type { MenuItem as MenuItemType } from "@/types/menu";

function MenuItem({ id, name, price }: MenuItemType) {
  const addToCart = useFoodOrderStore((state) => state.addToCart);

  return (
    <Item variant="outline" role="listitem">
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>${price}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="outline"
          onClick={() => addToCart({ id, name, price })}
        >
          Add to Cart
        </Button>
      </ItemActions>
    </Item>
  );
}

export { MenuItem };
