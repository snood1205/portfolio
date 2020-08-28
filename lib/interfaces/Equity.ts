import { Option } from "./Option";
import { Price } from "./Price";

type CoveredCall = "Covered Call";

export interface Equity {
  symbol: string;
  change: number;
  currentlyHeld: boolean;
  options: Option[];
  underlyingValue: Price;
  openingPremium: Price;
  numberOfContracts: number;
  closingPremium: Price;
  breakeven: Price;
  profitAndLoss: Price;
  marginImpact: Price | CoveredCall;
}
