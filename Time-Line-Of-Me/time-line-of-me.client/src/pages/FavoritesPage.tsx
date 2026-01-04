import React from 'react';
import { Heart } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext.js';
import { BookCard } from '../components/book/BookCard.js';
import { BookDetailModal } from '../components/book/BookDetailModal.js';
import { LoadingSpinner } from '../components/ui/LoadingSpinner.js';

export const FavoritesPage: React.FC = () => {
  const { books, loading, selectedBook, setSelectedBook } = useLibrary();

  // Фильтруем книги с рейтингом 5 звезд
  const favoriteBooks = books.filter((book) => book.rating === 5);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Heart size={32} className="text-amber-400 fill-amber-400" />
          <h1 className="font-serif text-4xl text-ivory">Favorite Books</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Your 5-star rated books • {favoriteBooks.length} {favoriteBooks.length === 1 ? 'book' : 'books'}
        </p>
      </div>

      {favoriteBooks.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={64} className="text-gray-700 mx-auto mb-4" />
          <h2 className="font-serif text-3xl text-ivory mb-2">No favorites yet</h2>
          <p className="text-gray-400">Rate books with 5 stars to add them to your favorites</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteBooks.map((book, index) => (
            <div
              key={book.id}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}

      {selectedBook && (
        <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </main>
  );
};