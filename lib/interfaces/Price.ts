export interface Price {
  dollars: number;
  cents: number;
}

const ZERO: Price = {
  dollars: 0,
  cents: 0,
};

export const sumPrices = (prices: readonly Price[]): Price =>
  prices.reduce<Price>((accumuluator, price) => add(accumuluator, price), ZERO);

export const add = (left: Price, right: Price): Price => {
  const cents = left.cents + right.cents;
  const dollars = left.dollars + right.dollars + Math.floor(cents / 100);
  return { dollars, cents: cents % 100 };
};

export const displayPriceAbs = ({ dollars, cents }: Price): string =>
  `${Math.abs(dollars)}.${cents < 10 ? `0${cents}` : cents}`;

export const displayPriceShort = (price: Price): string =>
  price.dollars < 0 ? `(${displayPriceAbs(price)})` : displayPriceAbs(price);

export const displayPrice = (price: Price): string =>
  price.dollars < 0 ? `($${displayPriceAbs(price)})` : `$${displayPriceAbs(price)}`;

export const parsePrice = (string: string): Price => {
  const [dollars, cents] = string
    .replace("$", "")
    .split(".")
    .map((value) => parseInt(value));
  if (cents > 100) return { dollars, cents: cents / 100 };
  return { dollars, cents };
};
