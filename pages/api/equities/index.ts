import { NextApiRequest, NextApiResponse } from "next";
import { mongoConnection, AsyncCallback } from "../../../lib/functions/mongoConnection";
import { Equity } from "../../../lib/interfaces/Equity";
import { all } from "../../../lib/functions/all";

interface JSON {
  equities: Equity[];
}

export const callbackFactory: AsyncCallback<readonly Equity[]> = async (_client, _db, collections) => {
  const { equitiesCollection: collection } = collections;

  return await all<Equity>(collection).toArray();
};

export default async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const equities = await mongoConnection<readonly Equity[]>(callbackFactory);
  res.status(200).json({ equities });
};
