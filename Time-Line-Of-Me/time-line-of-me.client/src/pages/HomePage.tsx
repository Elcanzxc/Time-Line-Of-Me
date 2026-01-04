import React, { useEffect } from 'react';
import { useLibrary } from '../context/LibraryContext.js';
import { BookCard } from '../components/book/BookCard.js';
import { BookDetailModal } from '../components/book/BookDetailModal.js';
import { QuoteSection } from '../components/ui/QuoteSection.js';
import { EmptyState } from '../components/common/EmptyState.js';
import { LoadingSpinner } from '../components/ui/LoadingSpinner.js';

export const HomePage: React.FC = () => {
  const { books, loading, selectedBook, setSelectedBook } = useLibrary();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <QuoteSection />

      {books.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book, index) => (
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
