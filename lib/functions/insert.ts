import { Collection, InsertOneWriteOpResult, WithId, OptionalId, InsertWriteOpResult } from "mongodb";

export const insertOne = <T>(
  collection: Collection<T>,
  value: OptionalId<T>,
): Promise<InsertOneWriteOpResult<WithId<T>>> => collection.insertOne(value);

export const insertMany = <T>(
  collection: Collection<T>,
  ...values: OptionalId<T>[]
): Promise<InsertWriteOpResult<WithId<T>>> => collection.insertMany(values);
