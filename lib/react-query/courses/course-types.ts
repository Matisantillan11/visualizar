/**
 * Course Types
 * 
 * TypeScript interfaces for course-related data
 */

export interface Course {
  id: string;
  name: string;
  teacherId: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCourseInput {
  name: string;
  teacherId: string;
  description?: string;
}

export interface UpdateCourseInput {
  name?: string;
  description?: string;
}

export interface CourseListParams {
  teacherId?: string;
  page?: number;
  limit?: number;
}
