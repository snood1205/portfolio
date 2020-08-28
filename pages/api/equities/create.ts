import { NextApiRequest, NextApiResponse } from "next";
import { mongoConnection, AsyncCallback } from "../../../lib/functions/mongoConnection";
import { Price, parsePrice } from "../../../lib/interfaces/Price";
import { Option } from "../../../lib/interfaces/Option";
import { Equity } from "../../../lib/interfaces/Equity";
import { insertOne } from "../../../lib/functions/insert";
import { InsertOneWriteOpResult, WithId } from "mongodb";

interface BodyDestructure {
  symbol: string;
  options: Option[];
  openingPremium: Price;
  numberOfContracts: number;
  closingPremium?: Price;
  marginImpact: Price;
  marginCovered: "on" | "off";
}

type CallbackReturn = InsertOneWriteOpResult<WithId<Equity>>;

const callbackEquity = (equity: Equity): AsyncCallback<CallbackReturn> => async (_client, _db, collections) => {
  const { equitiesCollection: collection } = collections;
  const insertedEquity = await insertOne<Equity>(collection, equity);
  return insertedEquity;
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const equity = convertBody(req);
  const inserted = await mongoConnection<CallbackReturn>(callbackEquity(equity));
  res.status(200).json({ inserted });
};

const convertBody = ({
  body: {
    symbol,
    options = [],
    openingPremium,
    numberOfContracts,
    closingPremium = undefined,
    marginImpact,
    currentHeld = "off",
    marginCovered = "off",
  },
}: NextApiRequest): Equity => ({
  symbol,
  options,
  openingPremium: parsePrice(openingPremium),
  numberOfContracts: parseInt(numberOfContracts),
  closingPremium: parsePrice(closingPremium),
  change: 0,
  currentlyHeld: currentHeld === "on",
  underlyingValue: parsePrice(openingPremium),
  breakeven: parsePrice(openingPremium),
  profitAndLoss: { dollars: 0, cents: 0 },
  marginImpact: marginCovered === "on" ? "Covered Call" : parsePrice(marginImpact),
});
