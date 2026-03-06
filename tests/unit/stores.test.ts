import { describe, it, expect, beforeEach } from 'vitest';
import { useGenreStore } from '../store/genreStore';
import { useAuthorStore } from '../store/authorStore';
import { useBookStore } from '../store/bookStore';
import type { Genre, Author, Book } from '../models';

// Mock data creators
const createMockGenre = (overrides?: Partial<Genre>): Genre => ({
  id: 1,
  name: 'Fiction',
  description: 'Fiction books',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

const createMockAuthor = (overrides?: Partial<Author>): Author => ({
  id: 1,
  name: 'J.K. Rowling',
  birthDate: new Date('1965-07-31'),
  biography: 'Famous author',
  email: 'jk@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

const createMockBook = (overrides?: Partial<Book>): Book => ({
  id: 1,
  title: 'Harry Potter',
  isbn: '978-0-7475-3269-9',
  authorId: '1',
  genreId: '1',
  description: 'A magical story',
  publishDate: new Date('1997-06-26'),
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

describe('Genre Store', () => {
  beforeEach(() => {
    useGenreStore.getState().clearGenres();
  });

  it('should initialize with empty genres', () => {
    const state = useGenreStore.getState();
    expect(state.genres).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should add a genre', () => {
    const genre = createMockGenre();
    useGenreStore.getState().addGenre(genre);
    expect(useGenreStore.getState().genres).toContain(genre);
  });

  it('should update a genre', () => {
    const genre = createMockGenre();
    useGenreStore.getState().addGenre(genre);
    
    const updatedGenre = createMockGenre({ name: 'Science Fiction' });
    useGenreStore.getState().updateGenre(1, updatedGenre);
    
    expect(useGenreStore.getState().genres[0].name).toBe('Science Fiction');
  });

  it('should delete a genre', () => {
    const genre = createMockGenre();
    useGenreStore.getState().addGenre(genre);
    useGenreStore.getState().deleteGenre(1);
    
    expect(useGenreStore.getState().genres).toHaveLength(0);
  });

  it('should set selected genre', () => {
    const genre = createMockGenre();
    useGenreStore.getState().setSelectedGenre(genre);
    
    expect(useGenreStore.getState().selectedGenre).toEqual(genre);
  });
});

describe('Author Store', () => {
  beforeEach(() => {
    useAuthorStore.getState().clearAuthors();
  });

  it('should initialize with empty authors', () => {
    const state = useAuthorStore.getState();
    expect(state.authors).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should add an author', () => {
    const author = createMockAuthor();
    useAuthorStore.getState().addAuthor(author);
    expect(useAuthorStore.getState().authors).toContain(author);
  });

  it('should update an author', () => {
    const author = createMockAuthor();
    useAuthorStore.getState().addAuthor(author);
    
    const updatedAuthor = createMockAuthor({ name: 'Joanne Murray' });
    useAuthorStore.getState().updateAuthor(1, updatedAuthor);
    
    expect(useAuthorStore.getState().authors[0].name).toBe('Joanne Murray');
  });

  it('should delete an author', () => {
    const author = createMockAuthor();
    useAuthorStore.getState().addAuthor(author);
    useAuthorStore.getState().deleteAuthor(1);
    
    expect(useAuthorStore.getState().authors).toHaveLength(0);
  });
});

describe('Book Store', () => {
  beforeEach(() => {
    useBookStore.getState().clearBooks();
  });

  it('should initialize with empty books', () => {
    const state = useBookStore.getState();
    expect(state.books).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should add a book', () => {
    const book = createMockBook();
    useBookStore.getState().addBook(book);
    expect(useBookStore.getState().books).toContain(book);
  });

  it('should update a book', () => {
    const book = createMockBook();
    useBookStore.getState().addBook(book);
    
    const updatedBook = createMockBook({ title: 'Harry Potter and the Philosopher\'s Stone' });
    useBookStore.getState().updateBook(1, updatedBook);
    
    expect(useBookStore.getState().books[0].title).toBe('Harry Potter and the Philosopher\'s Stone');
  });

  it('should delete a book', () => {
    const book = createMockBook();
    useBookStore.getState().addBook(book);
    useBookStore.getState().deleteBook(1);
    
    expect(useBookStore.getState().books).toHaveLength(0);
  });
});
