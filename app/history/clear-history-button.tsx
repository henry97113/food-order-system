"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useFoodOrderStore } from "@/store/food-order";

function ClearHistoryButton() {
  const [isOpen, setIsOpen] = useState(false);
  const clearHistory = useFoodOrderStore((state) => state.clearHistory);
  const orderHistory = useFoodOrderStore((state) => state.orderHistory);

  const hasHistory = orderHistory.length > 0;

  function openConfirmDialog() {
    setIsOpen(true);
  }

  if (!hasHistory) {
    return null;
  }

  return (
    <>
      <Button variant="destructive" onClick={openConfirmDialog}>
        Clear History
      </Button>
      <AlertDialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to clear all history?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => clearHistory()}
            >
              Clear all history
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export { ClearHistoryButton };
