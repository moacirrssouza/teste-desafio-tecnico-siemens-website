import { create } from 'zustand';
import type { Book } from '../../@types';
import { bookService } from './services/bookService';

interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
  selectedBook: Book | null;
  
  // Actions
  fetchBooks: () => Promise<void>;
  fetchBookById: (id: string | number) => Promise<void>;
  addBook: (book: Book) => void;
  updateBook: (id: string | number, book: Book) => void;
  deleteBook: (id: string | number) => void;
  setSelectedBook: (book: Book | null) => void;
  clearBooks: () => void;
}

export const useBookStore = create<BookState>((set) => ({
  books: [],
  loading: false,
  error: null,
  selectedBook: null,

  fetchBooks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await bookService.getAll();
      if (response.success && response.data) {
        set({ books: response.data, loading: false });
      } else {
        set({ error: response.message || 'Falha ao buscar o livro', loading: false });
      }
    } catch {
      set({ error: 'Falha ao buscar o livro', loading: false });
    }
  },

  fetchBookById: async (id: string | number) => {
    set({ loading: true, error: null });
    try {
      const response = await bookService.getById(id);
      if (response.success && response.data) {
        set({ selectedBook: response.data, loading: false });
      } else {
        set({ error: response.message || 'FFalha ao buscar o livro', loading: false });
      }
    } catch {
      set({ error: 'FFalha ao buscar o livro', loading: false });
    }
  },

  addBook: (book: Book) => {
    set((state) => ({ books: [...state.books, book] }));
  },

  updateBook: (id: string | number, updatedBook: Book) => {
    set((state) => ({
      books: state.books.map((b) => (b.id === id ? updatedBook : b)),
    }));
  },

  deleteBook: (id: string | number) => {
    set((state) => ({
      books: state.books.filter((b) => b.id !== id),
    }));
  },

  setSelectedBook: (book: Book | null) => {
    set({ selectedBook: book });
  },

  clearBooks: () => {
    set({ books: [], selectedBook: null, error: null });
  },
}));
