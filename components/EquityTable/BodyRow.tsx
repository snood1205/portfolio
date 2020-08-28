import { Equity } from "../../lib/interfaces/Equity";
import axios from "axios";
import { Price, displayPrice } from "../../lib/interfaces/Price";
import { displayOptions } from "../../lib/interfaces/Option";
import { useState, useEffect } from "react";

interface Props {
  equity: Equity;
  index: number;
}

export const BodyRow: React.FC<Props> = ({
  equity: {
    symbol,
    change,
    options,
    openingPremium,
    numberOfContracts,
    closingPremium,
    breakeven,
    profitAndLoss,
    marginImpact,
  },
  index,
}: Props) => {
  const [underlyingValue, setUnderlyingValue] = useState<Price>({ dollars: 0, cents: 0 });
  useEffect(() => {
    axios.get<{ price: Price }>(`/api/equity_price/${symbol}`).then(({ data: { price } }) => setUnderlyingValue(price));
  }, []);
  return (
    <tr key={index}>
      <td scope="row">{symbol}</td>
      <td>{change}</td>
      <td>{options.map(displayOptions).join("\n")}</td>
      <td>{displayPrice(underlyingValue)}</td>
      <td>{displayPrice(openingPremium)}</td>
      <td>{numberOfContracts}</td>
      <td>{displayPrice(closingPremium)}</td>
      <td>{displayPrice(breakeven)}</td>
      <td>{displayPrice(profitAndLoss)}</td>
      <td>{marginImpact == "Covered Call" ? marginImpact : displayPrice(marginImpact)}</td>
    </tr>
  );
};
