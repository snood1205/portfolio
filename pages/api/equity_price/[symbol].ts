import { NextApiRequest, NextApiResponse } from "next";
import { equityPrice } from "../../../lib/functions/equityPrice";

export default async ({ query: { symbol } }: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const price = await equityPrice(symbol as string);
    res.status(200).json({ symbol, price });
  } catch (e) {
    console.error(e);
  }
};
