import { Button } from "@/components/ui/button";
import Link from "next/link";
import { OrderHistory } from "./order-history";
import { ClearHistoryButton } from "./clear-history-button";

export default function HistoryPage() {
  return (
    <div>
      <header className="flex flex-col sm:flex-row justify-between items-center pb-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-balance py-4">
          Order History
        </h1>
        <div className="flex gap-3">
          <ClearHistoryButton />
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/menu" />}
          >
            Back to Menu
          </Button>
        </div>
      </header>
      <OrderHistory />
    </div>
  );
}
