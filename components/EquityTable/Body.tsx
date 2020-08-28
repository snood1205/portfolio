import { Equity } from "../../lib/interfaces/Equity";
import { BodyRow } from "./BodyRow";

interface Props {
  equities: readonly Equity[];
  showNotOwned: boolean;
}

type Mapper = (equity: Equity, index: number) => JSX.Element;

const mapAll: Mapper = (equity, index) => <BodyRow equity={equity} index={index} key={`mapper-${index}}`} />;

const mapOwned: Mapper = (equity, index) =>
  equity.currentlyHeld ? (
    <BodyRow equity={equity} index={index} key={`mapper-${index}}`} />
  ) : (
    <tr key={`mapper-${index}`} />
  );

const pickMapper = (showNotOwned: boolean): Mapper => (showNotOwned ? mapAll : mapOwned);

export const Body: React.FC<Props> = ({ equities, showNotOwned }: Props) => (
  <tbody>{equities.map(pickMapper(showNotOwned))}</tbody>
);
