import { SelectInput, Validate, OnChange, OnBlur } from "./SelectInput";
import { ReactElement, useState, Dispatch, SetStateAction } from "react";
import { InputType } from "reactstrap/lib/Input";

type OnChangeFactory<T> = (setter: Dispatch<SetStateAction<T | undefined>>) => OnChange;
type OnBlurFactory<T> = (setter: Dispatch<SetStateAction<T | undefined>>) => OnBlur;

interface Props<T> {
  initialValue?: T;
  name: string;
  validateFunction: Validate<T>;
  type: InputType;
  required?: boolean;
  onChangeFactory?: OnChangeFactory<T>;
  onBlurFactory?: OnBlurFactory<T>;
  display?: (value: T) => string;
  disabled?: boolean;
}

export const InputWithValidation = <T,>({
  initialValue,
  name,
  validateFunction,
  type,
  required,
  onChangeFactory,
  onBlurFactory,
  display,
  disabled,
}: Props<T>): ReactElement => {
  const [value, setValue] = useState<T | undefined>(initialValue);
  const displayValue = value == null || display == null ? (value == null ? "" : `${value}`) : display(value);
  return (
    <SelectInput<T>
      value={value}
      name={name}
      validateFunction={validateFunction}
      type={type}
      required={required}
      onChange={onChangeFactory && onChangeFactory(setValue)}
      onBlur={onBlurFactory && onBlurFactory(setValue)}
      inputPropsOverrides={{ value: displayValue }}
      disabled={disabled}
    />
  );
};
