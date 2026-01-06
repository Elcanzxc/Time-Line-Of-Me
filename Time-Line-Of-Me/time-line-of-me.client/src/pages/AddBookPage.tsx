import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookForm } from '../components/book/BookForm.js';
import { ROUTES } from '../utils/constants.js';
import { useLibrary } from '../context/LibraryContext.js';

export const AddBookPage: React.FC = () => {
  const navigate = useNavigate();


  const { seedBooks, loading } = useLibrary();
  return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4">
      
      {/* Кнопка "Магического заполнения" */}
      <button 
        onClick={seedBooks}
        disabled={loading}
        className="mb-6 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-all font-bold shadow-xl disabled:opacity-50"
      >
        {loading ? 'Загружаю данные...' : '✨ Заполнить тестовыми данными'}
      </button>

      {/* Твоя обычная форма */}
      <BookForm onClose={() => navigate(ROUTES.HOME)} mode="add" />
      
    </div>
  );
};