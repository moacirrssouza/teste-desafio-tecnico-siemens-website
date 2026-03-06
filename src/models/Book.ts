import type { Book, Author, Genre } from '../@types';
import { toAuthorModel } from './Author';
import { toGenreModel } from './Genre';
type RawBook = Partial<{
  id: string | number;
  title: string;
  isbn: string;
  publishDate: string | Date;
  authorId: string | number;
  genreId: string | number;
  pages: number | string;
  pageCount: number | string;
  numberOfPages: number | string;
  authorName: string;
  genreName: string;
  description: string | null | undefined;
  createdAt: string | Date;
  updatedAt: string | Date;
  author: unknown;
  genre: unknown;
}> & Record<string, unknown>;

export function toBookModel(input: unknown): Book {
  const raw = input as RawBook;
  let author: Author | undefined = raw?.author ? toAuthorModel(raw.author) : undefined;
  let genre: Genre | undefined = raw?.genre ? toGenreModel(raw.genre) : undefined;
  if (!author && (raw.authorName || raw.authorId)) {
    author = toAuthorModel({
      id: raw.authorId ?? '',
      name: raw.authorName ?? '',
    } as unknown);
  }
  if (!genre && (raw.genreName || raw.genreId)) {
    genre = toGenreModel({
      id: raw.genreId ?? '',
      name: raw.genreName ?? '',
    } as unknown);
  }
  return {
    id: (raw?.id ?? '') as string | number,
    title: String(raw?.title ?? ''),
    isbn: String(raw?.isbn ?? ''),
    publishDate: raw?.publishDate ? new Date(raw.publishDate as string) : new Date(),
    authorId: String(raw?.authorId ?? ''),
    genreId: String(raw?.genreId ?? ''),
    description: String(raw?.description ?? ''),
    pages: (() => {
      const p = (raw.pages ?? raw.pageCount ?? raw.numberOfPages) as unknown;
      if (typeof p === 'number') return p;
      if (typeof p === 'string' && p.trim().length > 0 && !isNaN(Number(p))) return Number(p);
      return undefined;
    })(),
    createdAt: raw?.createdAt ? new Date(raw.createdAt as string) : new Date(),
    updatedAt: raw?.updatedAt ? new Date(raw.updatedAt as string) : new Date(),
    author,
    genre,
  };
}

export function toBookModels(list: unknown): Book[] {
  if (!Array.isArray(list)) return [];
  return list.map((item) => toBookModel(item));
}
