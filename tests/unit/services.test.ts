import { describe, it, expect, vi } from 'vitest';
import { genreService, authorService, bookService } from '../services';

// Mock axios
vi.mock('../utils/apiClient', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Genre Service', () => {
  it('should have getAll method', () => {
    expect(genreService.getAll).toBeDefined();
  });

  it('should have getById method', () => {
    expect(genreService.getById).toBeDefined();
  });

  it('should have create method', () => {
    expect(genreService.create).toBeDefined();
  });

  it('should have update method', () => {
    expect(genreService.update).toBeDefined();
  });

  it('should have delete method', () => {
    expect(genreService.delete).toBeDefined();
  });
});

describe('Author Service', () => {
  it('should have getAll method', () => {
    expect(authorService.getAll).toBeDefined();
  });

  it('should have getById method', () => {
    expect(authorService.getById).toBeDefined();
  });

  it('should have create method', () => {
    expect(authorService.create).toBeDefined();
  });

  it('should have update method', () => {
    expect(authorService.update).toBeDefined();
  });

  it('should have delete method', () => {
    expect(authorService.delete).toBeDefined();
  });
});

describe('Book Service', () => {
  it('should have getAll method', () => {
    expect(bookService.getAll).toBeDefined();
  });

  it('should have getById method', () => {
    expect(bookService.getById).toBeDefined();
  });

  it('should have create method', () => {
    expect(bookService.create).toBeDefined();
  });

  it('should have update method', () => {
    expect(bookService.update).toBeDefined();
  });

  it('should have delete method', () => {
    expect(bookService.delete).toBeDefined();
  });
});
