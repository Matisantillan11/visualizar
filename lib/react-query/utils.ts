import { QueryKeyFactory } from "./types";

/**
 * Builds a URL with query parameters
 * @param baseUrl - The base URL
 * @param params - Query parameters object
 * @returns URL with query parameters
 */
export const buildUrlWithParams = (
  baseUrl: string,
  params?: Record<string, string | number | boolean>
): string => {
  if (!params || Object.keys(params).length === 0) {
    return baseUrl;
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });

  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}${searchParams.toString()}`;
};

/**
 * Creates a query key factory for a specific resource
 * This helps maintain consistent query keys across the app
 *
 * @param resource - The resource name (e.g., 'courses', 'books')
 * @returns Query key factory functions
 *
 * @example
 * const courseKeys = createQueryKeyFactory('courses');
 * courseKeys.all() // ['courses']
 * courseKeys.lists() // ['courses', 'list']
 * courseKeys.list(filters) // ['courses', 'list', filters]
 * courseKeys.details() // ['courses', 'detail']
 * courseKeys.detail(id) // ['courses', 'detail', id]
 */
export const createQueryKeyFactory = <TParams = any>(resource: string) => ({
  list: (params?: TParams): QueryKeyFactory<TParams> =>
    params
      ? ([resource, "list", params] as const)
      : ([resource, "list"] as const),
});

/**
 * Invalidates all queries for a specific resource
 * Useful after mutations to refresh data
 *
 * @param queryClient - The query client instance
 * @param resource - The resource name
 */
export const invalidateResource = async (
  queryClient: any,
  resource: string
): Promise<void> => {
  await queryClient.invalidateQueries({ queryKey: [resource] });
};

/**
 * Removes all queries for a specific resource from cache
 *
 * @param queryClient - The query client instance
 * @param resource - The resource name
 */
export const removeResourceQueries = (
  queryClient: any,
  resource: string
): void => {
  queryClient.removeQueries({ queryKey: [resource] });
};

/**
 * Prefetches data for a query
 * Useful for optimistic data loading
 *
 * @param queryClient - The query client instance
 * @param queryKey - The query key
 * @param queryFn - The query function
 */
export const prefetchQuery = async <TData>(
  queryClient: any,
  queryKey: readonly unknown[],
  queryFn: () => Promise<TData>
): Promise<void> => {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
  });
};
