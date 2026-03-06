export type { Genre } from './Genre';
export { genreValidation } from './Genre';

export type { Author } from './Author';
export { authorValidation, isValidEmail } from './Author';

export type { Book } from './Book';
export { bookValidation, isValidISBN } from './Book';

export type { ApiResponse, PaginatedResponse, ApiError } from './Api';
