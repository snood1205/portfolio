import { InputWithValidation } from "../shared/InputWithValidation";
import { Price, parsePrice, displayPrice } from "../../lib/interfaces/Price";

const validate = (price: Price | string): boolean => !(price.hasOwnProperty("cents") && (price as Price).cents < 0);

const display = (price: Price | string): string =>
  price.hasOwnProperty("cents") ? displayPrice(price as Price) : (price as string);

interface Props {
  name: string;
  required?: boolean;
  disabled?: boolean;
}

const hasNaNOrUndefined = ({ dollars }: Price): boolean => isNaN(dollars) || dollars == null;
const zeroCents = ({ dollars, cents }: Price): Price =>
  isNaN(cents) || cents == null ? { cents: 0, dollars } : { dollars, cents };

export const PriceInput: React.FC<Props> = ({ name, required, disabled }: Props) => (
  <InputWithValidation<Price | string>
    name={name}
    initialValue={required ? { dollars: 0, cents: 0 } : undefined}
    validateFunction={validate}
    type="text"
    required={required}
    display={display}
    disabled={disabled}
    onChangeFactory={(setValue) => ({ target: { value } }) => setValue(value)}
    onBlurFactory={(setValue) => ({ target: { value } }) => {
      const price = parsePrice(value);
      console.log(price);
      if (!hasNaNOrUndefined(price)) setValue(zeroCents(price));
    }}
  />
);
