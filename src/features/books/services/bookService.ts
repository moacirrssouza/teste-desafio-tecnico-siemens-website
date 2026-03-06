import apiClient from '../../../services/api';
import type { Book, ApiResponse } from '../../../@types';
import { toBookModel, toBookModels } from '../../../models';

const ENDPOINT = '/v1/books';
function idFrom(data: unknown): string | number | undefined {
  if (data && typeof data === 'object') {
    const d = data as Record<string, unknown>;
    const id = d.id;
    if (typeof id === 'string' || typeof id === 'number') return id;
    const nested = d.data;
    if (nested && typeof nested === 'object') {
      const nid = (nested as Record<string, unknown>).id;
      if (typeof nid === 'string' || typeof nid === 'number') return nid;
    }
  }
  return undefined;
}
function firstItemId(data: unknown): string | number | undefined {
  if (Array.isArray(data)) {
    const first: unknown = data[0];
    if (first && typeof first === 'object') {
      const d = first as Record<string, unknown>;
      const id = d.id;
      if (typeof id === 'string' || typeof id === 'number') return id;
    }
    return undefined;
  }
  if (data && typeof data === 'object') {
    const d = data as Record<string, unknown>;
    const inner = d.data;
    if (Array.isArray(inner)) {
      const first: unknown = inner[0];
      if (first && typeof first === 'object') {
        const dd = first as Record<string, unknown>;
        const id = dd.id;
        if (typeof id === 'string' || typeof id === 'number') return id;
      }
    }
  }
  return undefined;
}
async function tryGetPaths(paths: string[]): Promise<unknown> {
  for (const p of paths) {
    try {
      const res = await apiClient.get<unknown, unknown>(p);
      return res;
    } catch (e) { void e; }
  }
  throw new Error('GET paths failed');
}
async function tryPostPaths(paths: string[], payload: unknown): Promise<unknown> {
  for (const p of paths) {
    try {
      const res = await apiClient.post<unknown, unknown>(p, payload);
      return res;
    } catch (e) { void e; }
  }
  throw new Error('POST paths failed');
}
type BookCreatePayload = {
  title: string;
  isbn: string;
  publishDate: string;
  authorId: string;
  genreId: string;
  description: string;
};
type BookUpdatePayload = Partial<BookCreatePayload> & Partial<{
  authorName: string;
  genreName: string;
  pages: number;
}>;

export const bookService = {
  // Resolve Author ID by name (search or create)
  resolveAuthorIdByName: async (name: string): Promise<string | number> => {
    const n = name.trim();
    if (!n) return '';
    try {
      const byName = await tryGetPaths([
        `/v1/authors/by-name/${encodeURIComponent(n)}`,
        `/authors/by-name/${encodeURIComponent(n)}`,
        `/Authors/by-name/${encodeURIComponent(n)}`,
        `/v1/Authors/by-name/${encodeURIComponent(n)}`,
      ]);
      const id = idFrom(byName);
      if (id !== undefined && id !== null) return id;
    } catch (e) { void e; }
    try {
      const search = await tryGetPaths([
        `/v1/authors/search?name=${encodeURIComponent(n)}`,
        `/authors/search?name=${encodeURIComponent(n)}`,
        `/Authors/search?name=${encodeURIComponent(n)}`,
        `/v1/Authors/search?name=${encodeURIComponent(n)}`,
        `/v1/authors?name=${encodeURIComponent(n)}`,
        `/authors?name=${encodeURIComponent(n)}`,
        `/Authors?name=${encodeURIComponent(n)}`,
        `/v1/Authors?name=${encodeURIComponent(n)}`,
      ]);
      const id = firstItemId(search);
      if (id !== undefined && id !== null) return id;
    } catch (e) { void e; }
    const created = await tryPostPaths(
      [`/v1/authors`, `/authors`, `/Authors`, `/v1/Authors`],
      { name: n }
    );
    return idFrom(created) as string | number;
  },

  // Resolve Genre ID by name (search or create)
  resolveGenreIdByName: async (name: string): Promise<string | number> => {
    const n = name.trim();
    if (!n) return '';
    try {
      const byName = await tryGetPaths([
        `/v1/genres/by-name/${encodeURIComponent(n)}`,
        `/genres/by-name/${encodeURIComponent(n)}`,
        `/Genres/by-name/${encodeURIComponent(n)}`,
        `/v1/Genres/by-name/${encodeURIComponent(n)}`,
      ]);
      const id = idFrom(byName);
      if (id !== undefined && id !== null) return id;
    } catch (e) { void e; }
    try {
      const search = await tryGetPaths([
        `/v1/genres/search?name=${encodeURIComponent(n)}`,
        `/genres/search?name=${encodeURIComponent(n)}`,
        `/Genres/search?name=${encodeURIComponent(n)}`,
        `/v1/Genres/search?name=${encodeURIComponent(n)}`,
        `/v1/genres?name=${encodeURIComponent(n)}`,
        `/genres?name=${encodeURIComponent(n)}`,
        `/Genres?name=${encodeURIComponent(n)}`,
        `/v1/Genres?name=${encodeURIComponent(n)}`,
      ]);
      const id = firstItemId(search);
      if (id !== undefined && id !== null) return id;
    } catch (e) { void e; }
    const created = await tryPostPaths(
      [`/v1/genres`, `/genres`, `/Genres`, `/v1/Genres`],
      { name: n }
    );
    return idFrom(created) as string | number;
  },
  // Get all books
  getAll: async (): Promise<ApiResponse<Book[]>> => {
    const res = await apiClient.get<unknown, ApiResponse<Book[]>>(ENDPOINT);
    return { ...res, data: toBookModels(res.data) };
  },

  // Get book by ID
  getById: async (id: string | number): Promise<ApiResponse<Book>> => {
    const res = await apiClient.get<unknown, ApiResponse<Book>>(`${ENDPOINT}/${id}`);
    return { ...res, data: toBookModel(res.data) };
  },

  // Get books by author
  getByAuthor: async (authorId: string | number): Promise<ApiResponse<Book[]>> => {
    const res = await apiClient.get<unknown, ApiResponse<Book[]>>(`${ENDPOINT}/author/${authorId}`);
    return { ...res, data: toBookModels(res.data) };
  },

  // Get books by genre
  getByGenre: async (genreId: string | number): Promise<ApiResponse<Book[]>> => {
    const res = await apiClient.get<unknown, ApiResponse<Book[]>>(`${ENDPOINT}/genre/${genreId}`);
    return { ...res, data: toBookModels(res.data) };
  },

  // Create new book
  create: async (data: BookCreatePayload): Promise<ApiResponse<Book>> => {
    const res = await apiClient.post<unknown, ApiResponse<Book>>(ENDPOINT, data);
    return { ...res, data: toBookModel(res.data) };
  },

  // Create full book with author and genre names
  createFull: async (data: {
    title: string;
    authorName: string;
    genreName: string;
    isbn: string;
    publishDate: string;
    description: string;
    pages?: number;
  }): Promise<ApiResponse<Book>> => {
    try {
      const res = await apiClient.post<unknown, ApiResponse<Book>>(`${ENDPOINT}/full`, data);
      return { ...res, data: toBookModel(res.data) };
    } catch (err: unknown) {
      const status =
        typeof err === 'object' && err !== null && 'response' in err
          ? (err as { response?: { status?: number } }).response?.status
          : undefined;
      if (status === 404 || status === 405) {
        try {
          const alt = await apiClient.post<unknown, ApiResponse<Book>>(`${ENDPOINT}/create-full`, data);
          return { ...alt, data: toBookModel(alt.data) };
        } catch (e) { void e; }
        const base = await apiClient.post<unknown, ApiResponse<Book>>(`${ENDPOINT}`, data);
        return { ...base, data: toBookModel(base.data) };
      }
      throw err;
    }
  },

  // Update book
  update: async (id: string | number, data: BookUpdatePayload): Promise<ApiResponse<Book>> => {
    try {
      const res = await apiClient.put<unknown, ApiResponse<Book>>(`${ENDPOINT}/${id}`, data);
      return { ...res, data: toBookModel(res.data) };
    } catch (err: unknown) {
      const status =
        typeof err === 'object' && err !== null && 'response' in err
          ? (err as { response?: { status?: number } }).response?.status
          : undefined;
      if (status === 404 || status === 405) {
        try {
          const patchRes = await apiClient.patch<unknown, ApiResponse<Book>>(`${ENDPOINT}/${id}`, data);
          return { ...patchRes, data: toBookModel(patchRes.data) };
        } catch (e) { void e; }
        try {
          const putBase = await apiClient.put<unknown, ApiResponse<Book>>(`${ENDPOINT}`, { id, ...data } as unknown);
          return { ...putBase, data: toBookModel(putBase.data) };
        } catch (e) { void e; }
        try {
          const postUpdate = await apiClient.post<unknown, ApiResponse<Book>>(`${ENDPOINT}/update`, { id, ...data } as unknown);
          return { ...postUpdate, data: toBookModel(postUpdate.data) };
        } catch (e) { void e; }
        try {
          const postUpdate2 = await apiClient.post<unknown, ApiResponse<Book>>(`${ENDPOINT}/Update`, { id, ...data } as unknown);
          return { ...postUpdate2, data: toBookModel(postUpdate2.data) };
        } catch (e) { void e; }
        try {
          const putUpdateId = await apiClient.put<unknown, ApiResponse<Book>>(`${ENDPOINT}/update/${id}`, data);
          return { ...putUpdateId, data: toBookModel(putUpdateId.data) };
        } catch (e) { void e; }
        try {
          const full1 = await apiClient.post<unknown, ApiResponse<Book>>(`${ENDPOINT}/full/${id}`, data as unknown);
          return { ...full1, data: toBookModel(full1.data) };
        } catch (e) { void e; }
        try {
          const full2 = await apiClient.post<unknown, ApiResponse<Book>>(`${ENDPOINT}/update-full`, { id, ...data } as unknown);
          return { ...full2, data: toBookModel(full2.data) };
        } catch (e) { void e; }
        try {
          const over1 = await apiClient.post<unknown, ApiResponse<Book>>(
            `${ENDPOINT}/update-book/${id}`,
            data as unknown,
            { headers: { 'X-HTTP-Method-Override': 'PUT' } }
          );
          return { ...over1, data: toBookModel(over1.data) };
        } catch (e) { void e; }
        try {
          const over2 = await apiClient.post<unknown, ApiResponse<Book>>(
            `${ENDPOINT}/UpdateBook/${id}`,
            data as unknown,
            { headers: { 'X-HTTP-Method-Override': 'PUT' } }
          );
          return { ...over2, data: toBookModel(over2.data) };
        } catch (e) { void e; }
        try {
          const over3 = await apiClient.post<unknown, ApiResponse<Book>>(
            `${ENDPOINT}/update-book`,
            { id, ...data } as unknown,
            { headers: { 'X-HTTP-Method-Override': 'PUT' } }
          );
          return { ...over3, data: toBookModel(over3.data) };
        } catch (e) { void e; }
        try {
          const over4 = await apiClient.post<unknown, ApiResponse<Book>>(
            `${ENDPOINT}/UpdateBook`,
            { id, ...data } as unknown,
            { headers: { 'X-HTTP-Method-Override': 'PUT' } }
          );
          return { ...over4, data: toBookModel(over4.data) };
        } catch (e) { void e; }
        try {
          const UP = '/v1/Books';
          const upRes = await apiClient.put<unknown, ApiResponse<Book>>(`${UP}/${id}`, data);
          return { ...upRes, data: toBookModel(upRes.data) };
        } catch (e) { void e; }
        const postRes = await apiClient.post<unknown, ApiResponse<Book>>(`${ENDPOINT}/${id}`, data);
        return { ...postRes, data: toBookModel(postRes.data) };
      }
      throw err;
    }
  },

  // Delete book
  delete: async (id: string | number): Promise<ApiResponse<void>> => {
    return apiClient.delete<unknown, ApiResponse<void>>(`${ENDPOINT}/${id}`);
  },
};
