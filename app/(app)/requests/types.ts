import { User } from "@/app/(auth)/interfaces";

interface Course {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface BookRequestCourse {
  id: string;
  bookRequestId: string;
  courseId: string;
  course: Course;
}

export enum BookRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DENIED = "DENIED",
  PUBLISHED = "PUBLISHED",
}

export interface BookRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  title: string;
  authorName: string;
  comments: string;
  animations: string[];
  user: User;
  bookRequestCourse: BookRequestCourse[];
  status: BookRequestStatus;
}
