import { NestedKeys, NestedStringRecord } from "./book-types";

export function createBookRequestFormKeys<
  T extends Record<string, NestedStringRecord>
>(keys: T): NestedKeys<T> {
  return keys as NestedKeys<T>;
}
