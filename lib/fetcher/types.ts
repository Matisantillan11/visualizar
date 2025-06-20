import { FetchRequestInit } from "expo/fetch";

export type FetchResponseTypes = "json";

export type APIFetchArgs = {
  url: string;
  init?: FetchRequestInit | undefined;
  responseType?: FetchResponseTypes;
  withAuthentication?: boolean;
};

export type ApiResponse<T> = { body: T };
