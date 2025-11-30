import {
  QueryKey,
  UseQueryResult,
  useQuery as useTanstackQuery,
} from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { QueryFunctionParams, UseQueryConfig } from "./types";
import { buildUrlWithParams } from "./utils";

/**
 * Generic hook for GET requests using React Query
 * Provides automatic caching, refetching, and state management
 *
 * @template TData - The expected response data type
 * @template TError - The expected error type
 *
 * @param queryKey - Unique key for this query (use query key factories)
 * @param endpoint - API endpoint (e.g., '/courses' or '/courses/123')
 * @param options - Query configuration options
 * @param fetchOptions - Additional fetch options (headers, params, etc.)
 *
 * @returns Query result with data, loading state, error, and refetch function
 *
 * @example
 * ```tsx
 * const { data, isLoading, error, refetch } = useQuery(
 *   ['courses', 'list'],
 *   '/courses',
 *   { enabled: true },
 *   { params: { page: 1 } }
 * );
 * ```
 */
export function useQuery<TData = unknown, TError = Error>(
  queryKey: QueryKey,
  endpoint: string,
  options?: UseQueryConfig<TData, TError>,
  fetchOptions?: QueryFunctionParams
): UseQueryResult<TData, TError> {
  const {
    enabled = true,
    staleTime,
    gcTime,
    retry,
    refetchOnWindowFocus,
    refetchOnReconnect,
    refetchOnMount,
    refetchInterval,
    select,
    onSuccess,
    onError,
  } = options || {};

  return useTanstackQuery<TData, TError>({
    queryKey,
    queryFn: async () => {
      const url = buildUrlWithParams(endpoint, fetchOptions?.params);

      const data = await fetcher<TData>({
        url,
        init: fetchOptions?.init,
        responseType: fetchOptions?.responseType,
        withAuthentication: fetchOptions?.withAuthentication,
      });

      if (onSuccess) {
        onSuccess(data);
      }

      return data;
    },
    enabled,
    staleTime,
    gcTime,
    retry,
    refetchOnWindowFocus,
    refetchOnReconnect,
    refetchOnMount,
    refetchInterval,
    select,
    throwOnError: (error) => {
      if (onError) {
        onError(error as TError);
      }
      return false;
    },
  });
}
