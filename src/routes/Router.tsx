import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, BooksPage, LoginPage } from '../pages';
import { MainLayout, AuthLayout } from '../components/layout';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="*" element={<MainLayout />}>
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
};