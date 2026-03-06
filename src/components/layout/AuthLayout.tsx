import React from 'react';
import { Outlet, Link } from 'react-router-dom';
// Global styles imported in main.tsx

export const AuthLayout: React.FC = () => {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">Login</Link>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};
