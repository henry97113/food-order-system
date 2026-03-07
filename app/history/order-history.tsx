"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFoodOrderStore } from "@/store/food-order";
import { OrderItem } from "./order-item";

function OrderHistory() {
  const orderHistory = useFoodOrderStore((state) => state.orderHistory);

  if (orderHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-40 sm:h-60">
        <p>No transaction found.</p>
        <Button nativeButton={false} render={<Link href="/menu" />}>
          Go shopping
        </Button>
      </div>
    );
  }

  return (
    <div role="list" className="space-y-4 pb-6">
      {orderHistory.map((order) => (
        <OrderItem key={order.id} {...order} />
      ))}
    </div>
  );
}

export { OrderHistory };
