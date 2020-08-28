import { Input, InputProps } from "reactstrap";
import { InputType } from "reactstrap/lib/Input";
import { ChangeEvent, ReactElement, FocusEvent } from "react";

export type Validate<T> = (string: T) => boolean | null;
export type OnChange = (event: ChangeEvent<HTMLInputElement>) => void;
export type OnBlur = (event: FocusEvent<HTMLInputElement>) => void;

export interface Props<T = unknown> {
  name: string;
  value?: T;
  validateFunction: Validate<T>;
  type: InputType;
  required?: boolean;
  onChange?: OnChange;
  onBlur?: OnBlur;
  disabled?: boolean;
  inputPropsOverrides?: Partial<InputProps>;
}

export const SelectInput = <T,>({
  name,
  value,
  validateFunction,
  type,
  required,
  onChange,
  disabled,
  onBlur,
  inputPropsOverrides,
}: Props<T>): ReactElement => {
  const inputProps: InputProps = { type, required, ...inputPropsOverrides, name, disabled };
  const propsWithChange = onChange ? { ...inputProps, onChange } : inputProps;
  const propsWithBlur = onBlur ? { ...propsWithChange, onBlur } : propsWithChange;
  switch (value && validateFunction(value)) {
    case true:
      return <Input {...propsWithBlur} valid />;
    case false:
      return <Input {...propsWithBlur} invalid />;
    default:
      return <Input {...propsWithBlur} />;
  }
};
