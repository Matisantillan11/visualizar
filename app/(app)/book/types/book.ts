export interface Author {
  id: number;
  documentId: string;
  name: string;
}



export interface Book {
  id: string;
  name: string;
  description: string;
  animationFolderName: string;
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

export interface BookResponse {
  data: Book;
  meta: any;
}
