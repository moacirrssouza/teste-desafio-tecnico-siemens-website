import React, { useEffect, useState } from 'react';
import { useBooks } from '../../features/books/hooks/useBooks';
import { BookList } from '../../features/books/components/BookList';
import { BookFormModal } from '../../features/books/components/BookForm';
import { bookService } from '../../features/books/services/bookService';

export const BooksPage: React.FC = () => {
  const {
    books,
    loading,
    error,
    selectedBook,
    fetchBooks,
    updateBook,
    deleteBook,
    setSelectedBook,
  } = useBooks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleAddBook = () => {
    setSelectedBook(null);
    setIsFormOpen(true);
    setFormError(null);
    setFormSuccess(null);
  };

  const handleEditBook = (id: string | number) => {
    const book = books.find((b) => b.id === id);
    if (book) {
      setSelectedBook(book);
      setIsFormOpen(true);
      setFormError(null);
      setFormSuccess(null);
    }
  };

  const handleDeleteBook = async (id: string | number) => {
    try {
      await deleteBook(id);
    } catch {
      // Silencioso na página; futuramente podemos usar um toast
    }
  };

  const handleFormSubmit = async (formData: {
    title: string;
    isbn: string;
    description: string;
    publishedDate: string;
    pages?: number;
    authorName: string;
    genreName: string;
  }) => {
    try {
      const response = selectedBook
        ? await (async () => {
            let authorIdToUse: string | number = selectedBook.authorId ?? '';
            let genreIdToUse: string | number = selectedBook.genreId ?? '';
            const trimmedAuthor = formData.authorName.trim();
            const trimmedGenre = formData.genreName.trim();
            const prevAuthor = String(selectedBook.author?.name ?? '').trim();
            const prevGenre = String(selectedBook.genre?.name ?? '').trim();
            if (trimmedAuthor && trimmedAuthor.toLowerCase() !== prevAuthor.toLowerCase()) {
              try {
                const resolved = await bookService.resolveAuthorIdByName(trimmedAuthor);
                authorIdToUse = isNaN(Number(resolved)) ? String(resolved) : Number(resolved);
              } catch (e) { void e; }
            }
            if (trimmedGenre && trimmedGenre.toLowerCase() !== prevGenre.toLowerCase()) {
              try {
                const resolved = await bookService.resolveGenreIdByName(trimmedGenre);
                genreIdToUse = isNaN(Number(resolved)) ? String(resolved) : Number(resolved);
              } catch (e) { void e; }
            }
            return updateBook(selectedBook.id, {
              isbn: formData.isbn,
              title: formData.title,
              publishDate: formData.publishedDate,
              description: formData.description,
              pages: formData.pages,
            authorId: String(authorIdToUse ?? ''),
            genreId: String(genreIdToUse ?? ''),
            authorName: trimmedAuthor,
            genreName: trimmedGenre,
            });
          })()
        : await bookService.createFull({
            title: formData.title,
            isbn: formData.isbn,
            publishDate: formData.publishedDate,
            description: formData.description,
            pages: formData.pages,
            authorName: formData.authorName,
            genreName: formData.genreName,
          });
      if (response.success) {
        const msg = selectedBook ? 'Livro atualizado com sucesso' : 'Livro criado com sucesso';
        setFormSuccess(msg);
        setFormError(null);
      } else {
        throw new Error(response.message || 'Failed to save book');
      }
      setSelectedBook(null);
      fetchBooks();
      setTimeout(() => {
        setFormSuccess(null);
        setIsFormOpen(false);
      }, 1200);
    } catch (err) {
      const apiMsg = err instanceof Error ? err.message : 'Falha ao salvar';
      setFormError(apiMsg);
    }
  };

  return (
    <div className="page books-page">
      <div className="page-container">
        {error && <div className="alert alert-error">{error}</div>}

        <BookList
          books={books}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
          onAdd={handleAddBook}
          loading={loading}
        />
        <BookFormModal
          key={isFormOpen ? (selectedBook?.id || 'new') : 'closed'}
          open={isFormOpen}
          variant="modal"
          title={selectedBook ? 'Editar Livro' : 'Cadastro de Livro'}
          book={selectedBook}
          existingIsbns={books
            .filter((b) => !selectedBook || b.id !== selectedBook.id)
            .map((b) => b.isbn)}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedBook(null);
            setFormError(null);
            setFormSuccess(null);
          }}
          loading={loading}
          error={formError}
          successMessage={formSuccess}
        />
      </div>
    </div>
  );
};
