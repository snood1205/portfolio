import { FormGroup, Input, Label } from "reactstrap";
import { PriceInput } from "./PriceInput";
import { useState } from "react";

export const MarginImpact: React.FC = () => {
  const [isCoveredCall, setIsCoveredCall] = useState(false);
  return (
    <>
      <FormGroup>
        <Label for="marginImpact">Margin Impact</Label>
        <PriceInput name="marginImpact" disabled={isCoveredCall} />
      </FormGroup>
      <FormGroup required check>
        <Label check for="marginCovered">
          <Input
            name="marginCovered"
            type="checkbox"
            checked={isCoveredCall}
            onChange={({ target: { checked } }) => {
              setIsCoveredCall(checked);
            }}
          />{" "}
          Covered Call
        </Label>
      </FormGroup>
    </>
  );
};
