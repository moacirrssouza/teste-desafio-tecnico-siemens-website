import type { Genre } from '../@types';
type RawGenre = Partial<{
  id: string | number;
  name: string;
  description: string | null | undefined;
  createdAt: string | Date;
  updatedAt: string | Date;
}> & Record<string, unknown>;

export function toGenreModel(input: unknown): Genre {
  const raw = input as RawGenre;
  return {
    id: (raw?.id ?? '') as string | number,
    name: String(raw?.name ?? ''),
    description: String(raw?.description ?? ''),
    createdAt: raw?.createdAt ? new Date(raw.createdAt as string) : new Date(),
    updatedAt: raw?.updatedAt ? new Date(raw.updatedAt as string) : new Date(),
  };
}

export function toGenreModels(list: unknown): Genre[] {
  if (!Array.isArray(list)) return [];
  return list.map((item) => toGenreModel(item));
}

