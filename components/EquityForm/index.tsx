import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { InputWithValidation } from "../shared/InputWithValidation";
import { PriceInput } from "./PriceInput";
import { MarginImpact } from "./MarginImpact";
import { useState } from "react";

const validateSymbol = (string: string) => Boolean(string.match(/^[A-Z\.]+$/));

export const EquityForm: React.FC = () => {
  const [isCurrentlyHeld, setIsCurrentlyHeld] = useState(false);
  return (
    <Form action="/api/equities/create" method="POST">
      <FormGroup>
        <Label for="symbol">Ticker</Label>
        <InputWithValidation<string>
          initialValue=""
          name="symbol"
          validateFunction={validateSymbol}
          type="text"
          required
          onChangeFactory={(setValue) => ({ target: { value } }) => {
            setValue(value);
          }}
        />
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="currentlyHeld"
            checked={isCurrentlyHeld}
            onChange={({ target: { checked } }) => {
              setIsCurrentlyHeld(checked);
            }}
          />{" "}
          Currently Held?
        </Label>
      </FormGroup>
      <FormGroup>
        <Label for="openingPremium">Opening Premium</Label>
        <PriceInput name="openingPremium" required />
      </FormGroup>
      <FormGroup>
        <Label for="numberOfContracts">Number of Contracts:</Label>
        <Input type="number" min={0} step={1} name="numberOfContracts" />
      </FormGroup>
      <FormGroup>
        <Label for="closingPremium">Closing Premium</Label>
        <PriceInput name="closingPremium" disabled={isCurrentlyHeld} />
      </FormGroup>
      <MarginImpact />
      <Button color="primary">Create</Button>
    </Form>
  );
};
