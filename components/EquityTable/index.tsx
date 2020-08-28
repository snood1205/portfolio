import { Equity } from "../../lib/interfaces/Equity";
import { Table } from "reactstrap";
import { Header } from "./Header";
import { Body } from "./Body";
import { Footer } from "./Footer";

interface Props {
  equities: Equity[];
  showNotOwned: boolean;
}

export const EquityTable: React.FC<Props> = ({ equities, showNotOwned }: Props) => (
  <Table striped>
    <Header />
    <Body equities={equities} showNotOwned={showNotOwned} />
    <Footer equities={equities} />
  </Table>
);
