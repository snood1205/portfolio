import { EquityTable } from "../components/EquityTable";
import { Equity } from "../lib/interfaces/Equity";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "reactstrap";

const showHidden = (): boolean => {
  const { query } = useRouter();
  return query.show_all != null && query.show_all != "false";
};

const Home: React.FC = () => {
  const [equities, setEquities] = useState<Equity[]>([]);
  const showNotOwned = showHidden();

  useEffect(() => {
    axios.get("/api/equities", { params: { showNotOwned } }).then(({ data }) => {
      setEquities(data.equities);
    });
  }, []);

  return (
    <div>
      <Link href="/equities/new">
        <a className="btn btn-primary">Add an Equity</a>
      </Link>
      <EquityTable equities={equities} showNotOwned={showNotOwned} />
    </div>
  );
};

export default Home;
