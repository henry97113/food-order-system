"use client";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { MenuItem } from "@/types/menu";

interface MenuItemProps extends MenuItem {
  addToCart?: () => void;
}

function MenuItem({ name, price }: MenuItemProps) {
  return (
    <Item variant="outline" role="listitem">
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>${price}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="secondary">Add to Cart</Button>
      </ItemActions>
    </Item>
  );
}

export { MenuItem };
