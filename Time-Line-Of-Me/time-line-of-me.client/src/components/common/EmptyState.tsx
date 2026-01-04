import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants.js';

export const EmptyState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-20">
      <BookOpen size={64} className="text-gray-700 mx-auto mb-4" />
      <h2 className="font-serif text-3xl text-ivory mb-2">Your library is empty</h2>
      <p className="text-gray-400 mb-6">Start building your collection by adding your first book</p>
      <button
        onClick={() => navigate(ROUTES.ADD_BOOK)}
        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white rounded-lg transition-all shadow-lg font-medium"
      >
        <Plus size={20} />
        Add Your First Book
      </button>
    </div>
  );
};