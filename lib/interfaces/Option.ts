import { displayPrice, Price } from "./Price";

export interface Option {
  position: "SHORT" | "LONG";
  type: "CALL" | "PUT";
  strikePrice: Price;
  expirationDate: Date;
}

const displayExpirationDate = (expirationDate: Date): string => {
  const yyyy = expirationDate.getFullYear();
  const mm = expirationDate.getMonth() + 1;
  const dd = expirationDate.getDate();
  return `${mm}/${dd}/${yyyy}`;
};

export const displayOptions = ({ position, type, strikePrice, expirationDate }: Option): string =>
  `${position} ${type} EXPIRING ${displayExpirationDate(expirationDate)} WITH STRIKE ${displayPrice(strikePrice)}`;
