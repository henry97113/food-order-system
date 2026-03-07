import { RiAddLine, RiDeleteBinLine, RiSubtractLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { useState } from "react";

interface QuantityStepperProps {
  initialValue: number;
  onValueChange: (val: number) => void;
}

function QuantityStepper({
  initialValue = 0,
  onValueChange,
}: QuantityStepperProps) {
  const [value, setValue] = useState(initialValue);

  function increment() {
    const nextValue = value + 1;
    setValue(nextValue);
    onValueChange(nextValue);
  }

  function decrement() {
    const nextValue = value - 1;
    setValue(nextValue);
    onValueChange(nextValue);
  }

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size="icon"
        aria-label="Decrement"
        onClick={decrement}
      >
        {value <= 1 ? <RiDeleteBinLine /> : <RiSubtractLine />}
      </Button>
      <ButtonGroupText
        data-testid="cart-item-stepper-quantity"
        className="w-10 justify-center"
      >
        {value}
      </ButtonGroupText>
      <Button
        variant="outline"
        size="icon"
        aria-label="Increment"
        onClick={increment}
      >
        <RiAddLine />
      </Button>
    </ButtonGroup>
  );
}

export { QuantityStepper };
