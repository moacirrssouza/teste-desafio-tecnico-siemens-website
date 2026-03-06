import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookForm } from '../components/Book/BookForm';
import type { Author, Genre } from '../models';

const authors: Author[] = [
  {
    id: '1',
    name: 'Author 1',
    birthDate: new Date('1990-01-01'),
    biography: 'biography biography',
    email: 'a@a.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const genres: Genre[] = [
  {
    id: '1',
    name: 'Genre 1',
    description: 'desc desc',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('BookForm validation', () => {
  it('shows errors when required fields are missing', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(
      <BookForm
        authors={authors}
        genres={genres}
        onSubmit={onSubmit}
        onCancel={() => {}}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: /create book/i }));

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/author is required/i)).toBeInTheDocument();
    expect(screen.getByText(/genre is required/i)).toBeInTheDocument();
    expect(screen.getByText(/isbn is required/i)).toBeInTheDocument();
    expect(screen.getByText(/publish date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits when all required fields are provided', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(
      <BookForm
        authors={authors}
        genres={genres}
        onSubmit={onSubmit}
        onCancel={() => {}}
      />
    );

    await userEvent.type(screen.getByLabelText(/título do livro/i), 'My Book');
    await userEvent.selectOptions(screen.getByLabelText(/autor/i), '1');
    await userEvent.selectOptions(screen.getByLabelText(/gênero/i), '1');
    await userEvent.type(screen.getByLabelText(/isbn/i), '978-0-1234-5678-9');
    await userEvent.type(screen.getByLabelText(/data da publicação/i), '2024-01-01');
    await userEvent.type(screen.getByLabelText(/descrição/i), 'Some description here');

    await userEvent.click(screen.getByRole('button', { name: /create book/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    const payload = onSubmit.mock.calls[0][0];
    expect(payload.title).toBe('My Book');
    expect(payload.authorId).toBe('1');
    expect(payload.genreId).toBe('1');
    expect(payload.isbn).toBe('978-0-1234-5678-9');
    expect(payload.publishDate).toBe('2024-01-01');
    expect(payload.description).toBe('Some description here');
  });
});
