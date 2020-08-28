import alpha from "alphavantage";
import { isMarketOpen } from "./isMarketOpen";
import { Price, parsePrice } from "../interfaces/Price";

interface Data {
  "Meta Data": {
    "1. Information": "Intraday (1min) open, high, low, close prices and volume";
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Interval": "1min";
    "5. Output Size": "Compact";
    "6. Time Zone": "US/Eastern";
  };
  "Time Series (1min)": {
    [key: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  };
}

export const equityPrice = async (symbol: string): Promise<Price> => {
  const alphaClient = alpha({ key: process.env.ALPHA_VANTAGE_API_KEY ?? "" });
  if (true || isMarketOpen()) {
    const data: Data = await alphaClient.data.intraday(symbol);
    const mostRecentKey = Object.keys(data["Time Series (1min)"])[0];
    return parsePrice(data["Time Series (1min)"][mostRecentKey]["4. close"]);
  }
};
