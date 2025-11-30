/**
 * Query Keys for Courses
 *
 * Centralized query key management for course-related queries.
 * This ensures consistency across the app and makes cache invalidation easier.
 */

import { createQueryKeyFactory } from "../index";

/**
 * Course query key factory
 *
 * Usage:
 * - courseKeys.list() -> ['courses', 'list']
 * - courseKeys.list({ teacherId: '123' }) -> ['courses', 'list', { teacherId: '123' }]
 */
export const courseKeys = createQueryKeyFactory<{
  teacherId?: string;
  page?: number;
  limit?: number;
}>("courses");
