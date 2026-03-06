import type { Author } from '../@types';
type RawAuthor = Partial<{
  id: string | number;
  name: string;
  birthDate: string | Date;
  biography: string | null | undefined;
  email: string | null | undefined;
  createdAt: string | Date;
  updatedAt: string | Date;
}> & Record<string, unknown>;

export function toAuthorModel(input: unknown): Author {
  const raw = input as RawAuthor;
  return {
    id: (raw?.id ?? '') as string | number,
    name: String(raw?.name ?? ''),
    birthDate: raw?.birthDate ? new Date(raw.birthDate as string) : new Date(),
    biography: String(raw?.biography ?? ''),
    email: String(raw?.email ?? ''),
    createdAt: raw?.createdAt ? new Date(raw.createdAt as string) : new Date(),
    updatedAt: raw?.updatedAt ? new Date(raw.updatedAt as string) : new Date(),
  };
}

export function toAuthorModels(list: unknown): Author[] {
  if (!Array.isArray(list)) return [];
  return list.map((item) => toAuthorModel(item));
}
