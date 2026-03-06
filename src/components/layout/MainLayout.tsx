import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { environment } from '../../services/config/environments/environment';

export const MainLayout: React.FC = () => {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-container">
          <p className="navbar-brand">{environment.APP_NAME}</p>
          <ul className="nav-links">
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/books">Livros</Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; 2026 {environment.APP_NAME}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};
