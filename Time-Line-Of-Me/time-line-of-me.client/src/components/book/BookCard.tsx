import React, { useState } from 'react';
import type { Book } from '../../types/Book.js';
import { useLibrary } from '../../context/LibraryContext.js';
import { StarRating } from '../ui/StartRating.js';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { setSelectedBook } = useLibrary();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setSelectedBook(book)}
    >
      <div
        className={`relative overflow-hidden rounded-lg transition-all duration-500 ${
          isHovered ? 'transform -translate-y-2 shadow-2xl shadow-amber-900/20' : 'shadow-lg'
        }`}
      >
        <div className="aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900">
          <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
        </div>

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <div className="flex justify-between items-center">
              <StarRating rating={book.rating || 0} size={16} readonly />
            </div>
            <button className="w-full bg-amber-700/90 hover:bg-amber-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors backdrop-blur-sm">
              Read More
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-serif text-lg text-ivory line-clamp-1 group-hover:text-amber-400 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-gray-400">{book.author}</p>
      </div>
    </div>
  );
};