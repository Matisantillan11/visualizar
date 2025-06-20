export interface Author {
  id: number;
  documentId: string;
  name: string;
}

export interface Image {
  id: number;
  documentId: string;
  url: string;
}

export interface Book {
  id: number;
  documentId: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  author_id: Author;
  image: Image;
}

export interface BooksResponse {
  data: Book[];
  pagination: any;
}

export interface BookResponse {
  data: Book;
  meta: any;
}
