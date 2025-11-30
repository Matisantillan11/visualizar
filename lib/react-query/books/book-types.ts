export interface Book {
  id: string;
  name: string;
  description: string;
  animations: Animation[];
  imageUrl: string;
  is3dEnabled: boolean;
  releaseDate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  bookAuthor: BookAuthor[];
  bookCategory: BookCategory[];
  bookCourse: BookCourse[];
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
}

export type Animation = {
  [key: string]: {
    source: string;
    texture: string;
  };
};

export interface BookAuthor {
  authorId: string;
  bookId: string;
  author: Author;
}

export interface BookCategory {
  bookId: string;
  categoryId: string;
}

export interface BookCourse {
  bookId: string;
  courseId: string;
}

export interface BookListParams {
  courseId?: string;
}

export interface CreateBookRequestInput {
  courseIds: string[];
  title: string;
  authorName: string;
  comments?: string;
  animations: string[];
}

export interface BookRequestCreateResponse {
  id: string;
  title: string;
  authorName: string;
  comments?: string;
  status: string;
  courseIds: string[];
  animations: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BookResponse {
  data: Book;
  meta: any;
}

import { User } from "@/app/(auth)/interfaces";
import { InferType } from "@/interfaces/zod.types";
import { Path } from "react-hook-form";
import { Course } from "../courses";
import { formSchema } from "./schema";

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

export type FormValues = InferType<typeof formSchema>;

export type NestedKeys<T> = {
  [K in keyof T]: T[K] extends string ? Path<FormValues> : NestedKeys<T[K]>;
};

export type NestedStringRecord = string | { [key: string]: NestedStringRecord };
