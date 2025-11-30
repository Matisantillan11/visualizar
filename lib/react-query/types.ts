import { APIFetchArgs } from "../fetcher";

export interface UseQueryConfig<TData = unknown, TError = Error> {
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
  retry?: number | boolean;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  refetchOnMount?: boolean;
  refetchInterval?: number | false;
  select?: (data: TData) => any;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}

export interface UseMutationConfig<
  TData = unknown,
  TVariables = unknown,
  TError = Error
> {
  onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>;
  onError?: (error: TError, variables: TVariables) => void;
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables
  ) => void;
  retry?: number | boolean;
}

export interface UseMutationConfig<
  TData = unknown,
  TVariables = unknown,
  TError = Error
> {
  onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>;
  onError?: (error: TError, variables: TVariables) => void;
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables
  ) => void;
  retry?: number | boolean;
}

export interface QueryFunctionParams extends Omit<APIFetchArgs, "url"> {
  params?: Record<string, string | number | boolean>;
}

export interface MutationFunctionParams<TVariables = unknown>
  extends Omit<APIFetchArgs, "url"> {
  variables?: TVariables;
}

export type QueryKeyFactory<TParams = unknown> = readonly unknown[];

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<TData> {
  data: TData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
