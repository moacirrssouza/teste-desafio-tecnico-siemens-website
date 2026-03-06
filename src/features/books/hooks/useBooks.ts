import { useCallback } from 'react';
import { useBookStore } from '../bookStore';
import { bookService } from '../services/bookService';
type BookCreatePayload = {
  title: string;
  isbn: string;
  publishDate: string;
  authorId: string;
  genreId: string;
  description: string;
  authorName?: string;
  genreName?: string;
  pages?: number;
};
type BookUpdatePayload = Partial<
  BookCreatePayload & {
    authorName: string;
    genreName: string;
    pages: number;
  }
>;

export const useBooks = () => {
  const store = useBookStore();

  const createBook = useCallback(async (data: BookCreatePayload) => {
    try {
      const response = await bookService.create(data);
      if (response.success && response.data) {
        store.addBook(response.data);
      }
      return response;
    } catch (error) {
      console.error('Failed to create book:', error);
      throw error;
    }
  }, [store]);

  const updateBook = useCallback(async (id: string | number, data: BookUpdatePayload) => {
    try {
      const numericId = typeof id === 'string' && !isNaN(Number(id)) ? Number(id) : id;
      const response = await bookService.update(numericId, data);
      if (response.success && response.data) {
        store.updateBook(id, response.data);
      }
      return response;
    } catch (error) {
      console.error('Failed to update book:', error);
      throw error;
    }
  }, [store]);

  const deleteBook = useCallback(async (id: string | number) => {
    try {
      const numericId = typeof id === 'string' && !isNaN(Number(id)) ? Number(id) : id;
      const response = await bookService.delete(numericId);
      if (response.success) {
        store.deleteBook(id);
      }
      return response;
    } catch (error) {
      console.error('Failed to delete book:', error);
      throw error;
    }
  }, [store]);

  return {
    ...store,
    createBook,
    updateBook,
    deleteBook,
  };
};
