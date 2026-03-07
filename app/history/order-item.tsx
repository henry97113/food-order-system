"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useFoodOrderStore } from "@/store/food-order";
import type { Order } from "@/store/history-slice";
import { useState } from "react";

function OrderItem({ id, items, total, date }: Order) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteOrder = useFoodOrderStore((state) => state.deleteOrder);

  function openConfirmDialog() {
    setIsOpen(true);
  }

  return (
    <>
      <Item
        variant="outline"
        role="listitem"
        className="flex-col items-start sm:flex-row sm:items-center"
      >
        <ItemContent>
          <ItemTitle className="text-xl" data-testid="order-item-id">
            Order {id.slice(0, 8)}
          </ItemTitle>
          <ItemDescription data-testid="order-item-time">
            {new Date(date).toLocaleString("en-US")}
          </ItemDescription>
          <ul data-testid="order-item-entries">
            {items.map((item) => (
              <li key={item.id}>
                {item.name} - ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3 className="text-lg pt-4">
            Subtotal: $
            <span data-testid="order-item-subtotal">{total.toFixed(2)}</span>
          </h3>
        </ItemContent>
        <ItemActions>
          <Button variant="destructive" onClick={openConfirmDialog}>
            Delete
          </Button>
        </ItemActions>
      </Item>

      <AlertDialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this order?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => deleteOrder(id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export { OrderItem };
