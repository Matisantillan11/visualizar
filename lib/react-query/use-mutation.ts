import {
  UseMutationResult,
  useQueryClient,
  useMutation as useTanstackMutation,
} from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { MutationFunctionParams, UseMutationConfig } from "./types";

/**
 * Generic hook for POST, PUT, PATCH, DELETE requests using React Query
 * Provides automatic error handling, loading states, and cache invalidation
 *
 * @template TData - The expected response data type
 * @template TVariables - The mutation variables/payload type
 * @template TError - The expected error type
 *
 * @param endpoint - API endpoint (e.g., '/courses' or '/courses/123')
 * @param options - Mutation configuration options
 * @param fetchOptions - Additional fetch options (method, headers, etc.)
 *
 * @returns Mutation result with mutate function, loading state, and error
 *
 * @example
 * ```tsx
 * const { mutate, isPending, error } = useMutation(
 *   '/courses',
 *   {
 *     onSuccess: (data) => console.log('Created:', data),
 *     onError: (error) => console.error('Error:', error),
 *   },
 *   { init: { method: 'POST' } }
 * );
 *
 * // Use it
 * mutate({ name: 'Math 101', teacherId: '123' });
 * ```
 */
export function useMutation<
  TData = unknown,
  TVariables = unknown,
  TError = Error
>(
  endpoint: string | ((variables: TVariables) => string),
  options?: UseMutationConfig<TData, TVariables, TError>,
  fetchOptions?: Omit<MutationFunctionParams<TVariables>, "variables">
): UseMutationResult<TData, TError, TVariables> {
  const queryClient = useQueryClient();
  const { onSuccess, onError, onSettled, retry } = options || {};

  return useTanstackMutation<TData, TError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      // Determine the endpoint URL
      const url =
        typeof endpoint === "function" ? endpoint(variables) : endpoint;

      // Prepare the request body
      const body = variables
        ? JSON.stringify(variables)
        : fetchOptions?.init?.body;

      const data = await fetcher<TData>({
        url,
        init: {
          ...fetchOptions?.init,
          body,
          headers: {
            "Content-Type": "application/json",
            ...fetchOptions?.init?.headers,
          },
        },
        responseType: fetchOptions?.responseType,
        withAuthentication: fetchOptions?.withAuthentication,
      });

      return data;
    },
    onSuccess: async (data, variables, context) => {
      if (onSuccess) {
        await onSuccess(data, variables);
      }
    },
    onError: (error, variables, context) => {
      if (onError) {
        onError(error, variables);
      }
    },
    onSettled: (data, error, variables, context) => {
      if (onSettled) {
        onSettled(data, error, variables);
      }
    },
    retry,
  });
}

/**
 * Hook for mutations with automatic cache invalidation
 * Automatically invalidates specified query keys after successful mutation
 *
 * @template TData - The expected response data type
 * @template TVariables - The mutation variables/payload type
 * @template TError - The expected error type
 *
 * @param endpoint - API endpoint
 * @param invalidateKeys - Query keys to invalidate on success
 * @param options - Mutation configuration options
 * @param fetchOptions - Additional fetch options
 *
 * @returns Mutation result
 *
 * @example
 * ```tsx
 * const { mutate } = useMutationWithInvalidation(
 *   '/courses',
 *   [['courses']], // Invalidate all course queries
 *   { onSuccess: (data) => console.log('Created:', data) },
 *   { init: { method: 'POST' } }
 * );
 * ```
 */
export function useMutationWithInvalidation<
  TData = unknown,
  TVariables = unknown,
  TError = Error
>(
  endpoint: string | ((variables: TVariables) => string),
  invalidateKeys: readonly (readonly unknown[])[],
  options?: UseMutationConfig<TData, TVariables, TError>,
  fetchOptions?: Omit<MutationFunctionParams<TVariables>, "variables">
): UseMutationResult<TData, TError, TVariables> {
  const queryClient = useQueryClient();

  return useMutation<TData, TVariables, TError>(
    endpoint,
    {
      ...options,
      onSuccess: async (data, variables) => {
        // Invalidate specified queries
        await Promise.all(
          invalidateKeys.map((key) =>
            queryClient.invalidateQueries({ queryKey: key })
          )
        );

        // Call original onSuccess if provided
        if (options?.onSuccess) {
          await options.onSuccess(data, variables);
        }
      },
    },
    fetchOptions
  );
}
