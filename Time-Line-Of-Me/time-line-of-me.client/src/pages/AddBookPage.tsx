import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookForm } from '../components/book/BookForm.js';
import { ROUTES } from '../utils/constants.js';

export const AddBookPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <BookForm onClose={() => navigate(ROUTES.HOME)} mode="add" />
    </div>
  );
};