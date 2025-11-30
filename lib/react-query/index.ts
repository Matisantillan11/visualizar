export { QueryProvider } from "./provider";
export { queryClient } from "./query-client";

export { useMutation, useMutationWithInvalidation } from "./use-mutation";
export { useQuery } from "./use-query";

export {
  buildUrlWithParams,
  createQueryKeyFactory,
  invalidateResource,
  prefetchQuery,
  removeResourceQueries,
} from "./utils";

export type {
  QueryKey,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
export type {
  MutationFunctionParams,
  PaginatedResponse,
  PaginationParams,
  QueryFunctionParams,
  QueryKeyFactory,
  UseMutationConfig,
  UseQueryConfig,
} from "./types";

export { useQueryClient } from "@tanstack/react-query";
