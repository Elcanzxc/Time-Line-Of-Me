import React from 'react';
import { BookOpen, Plus, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLibrary } from '../../context/LibraryContext.js';
import { ROUTES } from '../../utils/constants.js';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { books } = useLibrary();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-charcoal/80 backdrop-blur-lg border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate(ROUTES.HOME)}
          >
            <div className="p-2 bg-amber-700/20 rounded-lg">
              <BookOpen size={28} className="text-amber-400" />
            </div>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl text-ivory">
                My Library
              </h1>
              <p className="text-sm text-gray-400">{books.length} books in collection</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(ROUTES.FAVORITES)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                isActive(ROUTES.FAVORITES)
                  ? 'bg-amber-700/30 text-amber-400'
                  : 'text-gray-400 hover:text-amber-400 hover:bg-gray-800'
              }`}
            >
              <Heart size={20} />
              <span className="hidden sm:inline">Favorites</span>
            </button>

            <button
              onClick={() => navigate(ROUTES.ADD_BOOK)}
              className="flex items-center gap-2 px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white rounded-lg transition-all shadow-lg shadow-amber-900/30 hover:shadow-amber-900/50 font-medium"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Add Book</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};