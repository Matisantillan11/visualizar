/**
 * Course API Hooks
 *
 * Custom hooks for course-related API operations using React Query.
 * These hooks provide a clean, reusable interface for course data management.
 */

import { useQuery } from "../index";
import { courseKeys } from "./course-keys";
import type { Course, CourseListParams } from "./course-types";

/**
 * Hook to fetch all courses
 *
 * @param params - Optional query parameters (teacherId, pagination)
 * @param enabled - Whether the query should run (default: true)
 *
 * @example
 * ```tsx
 * function CoursesList() {
 *   const { data: courses, isLoading, error } = useCourses();
 *
 *   if (isLoading) return <Loader />;
 *   if (error) return <Text>Error loading courses</Text>;
 *
 *   return (
 *     <View>
 *       {courses?.map(course => (
 *         <Text key={course.id}>{course.name}</Text>
 *       ))}
 *     </View>
 *   );
 * }
 * ```
 */
export function useCourses(params?: CourseListParams, enabled: boolean = true) {
  return useQuery<Course[]>(
    courseKeys.list(params),
    "/courses",
    { enabled },
    params
      ? { params: params as Record<string, string | number | boolean> }
      : undefined
  );
}

/**
 * Hook to fetch courses by teacher ID
 *
 * @param teacherId - The teacher's ID
 * @param enabled - Whether the query should run (default: true when teacherId exists)
 *
 * @example
 * ```tsx
 * function TeacherCourses({ teacherId }: { teacherId: string }) {
 *   const { data: courses, isLoading } = useCoursesByTeacher(teacherId);
 *
 *   if (isLoading) return <Loader />;
 *
 *   return (
 *     <View>
 *       {courses?.map(course => (
 *         <CourseCard key={course.id} course={course} />
 *       ))}
 *     </View>
 *   );
 * }
 * ```
 */
export function useCoursesByTeacherId(teacherId?: string, enabled?: boolean) {
  const shouldEnable = enabled !== undefined ? enabled : !!teacherId;

  return useQuery<Course[]>(
    courseKeys.list({ teacherId }),
    `/courses/teacher/${teacherId}`,
    { enabled: shouldEnable }
  );
}
