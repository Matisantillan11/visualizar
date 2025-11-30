import { useMutationWithInvalidation, useQuery } from "../index";
import { bookKeys, bookRequestKeys } from "./book-keys";
import type {
  Book,
  BookListParams,
  BookRequest,
  CreateBookRequestInput,
} from "./book-types";

/**
 * Hook to fetch all books
 *
 * @param params - Optional query parameters (courseId)
 * @param enabled - Whether the query should run (default: true)
 *
 * @example
 * ```tsx
 * function BooksList() {
 *   const { data: books, isLoading, error } = useBooks();
 *
 *   if (isLoading) return <Loader />;
 *   if (error) return <Text>Error loading books</Text>;
 *
 *   return (
 *     <View>
 *       {books?.map(book => (
 *         <Text key={book.id}>{book.name}</Text>
 *       ))}
 *     </View>
 *   );
 * }
 * ```
 */
export function useBooks(params?: BookListParams, enabled: boolean = true) {
  return useQuery<Book[]>(
    bookKeys.list(params),
    "/books",
    { enabled },
    params
      ? { params: params as Record<string, string | number | boolean> }
      : undefined
  );
}

/**
 * Hook to fetch books by course ID
 *
 * @param courseId - The course ID (use "all" for all books)
 * @param enabled - Whether the query should run (default: true when courseId exists)
 *
 * @example
 * ```tsx
 * function CourseBooks({ courseId }: { courseId: string }) {
 *   const { data: books, isLoading } = useBooksByCourseId(courseId);
 *
 *   if (isLoading) return <Loader />;
 *
 *   return (
 *     <View>
 *       {books?.map(book => (
 *         <BookCard key={book.id} book={book} />
 *       ))}
 *     </View>
 *   );
 * }
 * ```
 */
export function useBooksByCourseId(courseId?: string, enabled?: boolean) {
  const shouldEnable = enabled !== undefined ? enabled : !!courseId;
  const isAllBooks = courseId === "all";

  return useQuery<Book[]>(
    bookKeys.list(isAllBooks ? undefined : { courseId }),
    isAllBooks ? "/books" : `/books/course/${courseId}`,
    { enabled: shouldEnable && !!courseId }
  );
}

/**
 * Hook to fetch a single book by ID
 *
 * @param bookId - The book ID
 * @param enabled - Whether the query should run (default: true when bookId exists)
 *
 * @example
 * ```tsx
 * function BookDetail({ bookId }: { bookId: string }) {
 *   const { data: book, isLoading, error } = useBook(bookId);
 *
 *   if (isLoading) return <Loader />;
 *   if (error) return <ErrorMessage error={error} />;
 *   if (!book) return <Text>Book not found</Text>;
 *
 *   return (
 *     <View>
 *       <Text>{book.name}</Text>
 *       <Text>{book.description}</Text>
 *     </View>
 *   );
 * }
 * ```
 */
export function useBook(bookId?: string, enabled?: boolean) {
  const shouldEnable = enabled !== undefined ? enabled : !!bookId;

  return useQuery<Book>(["books", "detail", bookId], `/books/${bookId}`, {
    enabled: shouldEnable && !!bookId,
  });
}

/**
 *
 * @param enabled - Whether the query should run (default: true)
 *
 * @example
 * ```tsx
 * function BookRequests() {
 *   const { data: bookRequests, isLoading } = useBookRequests();
 *
 *   if (isLoading) return <Loader />;
 *
 *   return (
 *     <View>
 *       {bookRequests?.map(bookRequest => (
 *         <BookRequestCard key={bookRequest.id} bookRequest={bookRequest} />
 *       ))}
 *     </View>
 *   );
 * }
 * ```
 */
export function useBookRequests(enabled?: boolean) {
  return useQuery<BookRequest[]>(bookRequestKeys.list(), "/books/requests", {
    enabled,
  });
}

/**
 * Hook to create a book request
 *
 * @param options - Configuration options (onSuccess, onError callbacks)
 *
 * @example
 * ```tsx
 * function RequestBookForm() {
 *   const { mutate: createBookRequest, isPending } = useCreateBookRequest({
 *     onSuccess: (bookRequest) => {
 *       showToast('Book request created successfully!', 'success');
 *       router.navigate('/(app)');
 *     },
 *     onError: (error) => {
 *       showToast('Failed to create book request', 'error');
 *     },
 *   });
 *
 *   const handleSubmit = (formData: CreateBookRequestInput) => {
 *     createBookRequest(formData);
 *   };
 *
 *   return (
 *     <Button onPress={() => handleSubmit(data)}>
 *       {isPending ? 'Creating...' : 'Request Book'}
 *     </Button>
 *   );
 * }
 * ```
 */
export function useCreateBookRequest(options?: {
  onSuccess?: (bookRequest: BookRequest) => void;
  onError?: (error: Error) => void;
}) {
  return useMutationWithInvalidation<BookRequest, CreateBookRequestInput>(
    "/books/request",
    [bookRequestKeys.list()],
    {
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    },
    { init: { method: "POST" } }
  );
}
