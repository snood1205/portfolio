import { Equity } from "../../lib/interfaces/Equity";
import { sumPrices, displayPrice } from "../../lib/interfaces/Price";

interface Props {
  equities: readonly Equity[];
}

const sumContracts = (equities: readonly Equity[]) =>
  equities.reduce<number>((accumuluator, { numberOfContracts }) => accumuluator + numberOfContracts, 0);

export const Footer: React.FC<Props> = ({ equities }: Props) => (
  <tfoot>
    <tr>
      <th scope="col">Totals</th>
      <td />
      <td />
      <td />
      <td />
      <td>{sumContracts(equities)}</td>
      <td />
      <td />
      <td>{displayPrice(sumPrices(equities.map(({ profitAndLoss }) => profitAndLoss)))}</td>
      <td>
        {displayPrice(
          sumPrices(
            equities.map(({ marginImpact }) =>
              marginImpact === "Covered Call" ? { dollars: 0, cents: 0 } : marginImpact,
            ),
          ),
        )}
      </td>
    </tr>
  </tfoot>
);
