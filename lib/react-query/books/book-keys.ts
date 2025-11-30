import { createQueryKeyFactory } from "../index";

/**
 * Book query key factory
 *
 * Usage:
 * - bookKeys.list() -> ['books', 'list']
 * - bookKeys.list({ courseId: '123' }) -> ['books', 'list', { courseId: '123' }]
 */
export const bookKeys = createQueryKeyFactory<{
  courseId?: string;
}>("books");

/**
 * Book request query key factory
 */
export const bookRequestKeys = createQueryKeyFactory("book-requests");
