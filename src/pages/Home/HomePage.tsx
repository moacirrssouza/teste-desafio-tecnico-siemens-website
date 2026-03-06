import React, { useEffect} from 'react';
import { useBooks } from '../../features/books/hooks/useBooks';

export const HomePage: React.FC = () => {
  const { books, fetchBooks } = useBooks();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="page home-page">
      <div className="page-container">
        <h1>Sistema de gerenciamento de biblioteca</h1>
        <p>Bem-vindo ao Sistema de Gerenciamento da Biblioteca. Use a navegação para gerenciar gêneros, autores e livros.</p>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Livros</h3>
            <p className="stat-number">{books.length}</p>
          </div>
        </div>

       {/*  <div className="help-section">
          <h2>Quick Start</h2>
          <ul>
            <li>Navigate to "Genres" to manage book genres</li>
            <li>Navigate to "Authors" to manage book authors</li>
            <li>Navigate to "Books" to manage the book catalog</li>
            <li>Use the "Add" button to create new items</li>
            <li>Use the "Edit" button to modify existing items</li>
            <li>Use the "Delete" button to remove items (with confirmation)</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};
