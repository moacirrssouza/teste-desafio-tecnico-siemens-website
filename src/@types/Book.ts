import type { Author } from './Author';
import type { Genre } from './Genre';

export interface Book {
  id: string | number;
  title: string;
  isbn: string;
  publishDate: Date;
  authorId: string;
  genreId: string;
  description: string;
  pages?: number;
  createdAt: Date;
  updatedAt: Date;
  author?: Author;
  genre?: Genre;
}

export const bookValidation = {
  title: {
    min: 3,
    max: 200,
    required: true,
  },
  isbn: {
    pattern: /^[0-9-]+$/,
    required: true,
  },
  publishDate: {
    required: true,
  },
  authorId: {
    required: true,
  },
  genreId: {
    required: true,
  },
  description: {
    min: 10,
    max: 2000,
    required: true,
  },
};

export function isValidISBN(isbn: string): boolean {
  return bookValidation.isbn.pattern.test(isbn);
}
