import { Collection, Cursor, FilterQuery } from "mongodb";
import { PaginationOptions } from "../interfaces/PaginationOptions";

export const all = <T>(collection: Collection<T>, query?: FilterQuery<T>): Cursor<T> => collection.find(query);

export const allPaginated = <T>(collection: Collection<T>, { nodes, page }: PaginationOptions): Cursor<T> =>
  collection
    .find()
    .skip((page - 1) * nodes)
    .limit(nodes);
