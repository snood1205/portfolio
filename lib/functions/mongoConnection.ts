import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, Db, Collection } from "mongodb";
import { Equity } from "../interfaces/Equity";

export interface Collections {
  [key: string]: Collection;
}

type WithCollections<T> = T & { collections: Collections; db: Db };

export type Callback<T = void> = (client: MongoClient, db: Db, collections: Collections) => T;
export type AsyncCallback<T = void> = Callback<Promise<T>>;
export type CallbackFactory<T = void> = (req: NextApiRequest, res: NextApiResponse) => AsyncCallback<T>;
type CallbackUnion<T> = Callback<T> | AsyncCallback<T>;

const initializeCollections = (db: Db) => ({
  equitiesCollection: db.collection<Equity>("equities"),
});

const initializeClient = async (): Promise<WithCollections<{ client: MongoClient }>> => {
  const mongoUri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/";
  const client = await MongoClient.connect(mongoUri, { useUnifiedTopology: true });
  const db = client.db("portfolio");
  const collections = initializeCollections(db);
  return { client, db, collections };
};

export const mongoConnection = async <T = void>(callback: CallbackUnion<T>): Promise<T> => {
  const { client, db, collections } = await initializeClient();
  const callbackResults = callback(client, db, collections);
  return Promise.resolve(callbackResults) === callbackResults ? await callbackResults : callbackResults;
};
