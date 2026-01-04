import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Book } from "../types/Book.js";
import { bookApi } from "../api/bookApi.js";




interface LibraryContextType {
  books: Book[];
  loading: boolean;
  error: string | null;
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
  addBook: (book: Omit<Book, 'id'>) => Promise<void>;
  updateBook: (id: string, book: Omit<Book, 'id'>) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  refreshBooks: () => Promise<void>;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);



export const LibraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Загрузка книг при монтировании
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookApi.getAllBooks();
      setBooks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch books');
      console.error('Failed to fetch books:', err);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book: Omit<Book, 'id'>) => {
    try {
      setError(null);
      const newBookId = await bookApi.createBook({
        title: book.title,
        description: book.description,
        author: book.author,
        publishedDate: book.publishedDate,
        rating: book.rating,
        coverUrl: book.coverUrl,
      });

      // Добавляем книгу локально
      const newBook: Book = {
        ...book,
        id: newBookId,
        coverUrl: book.coverUrl || `https://picsum.photos/seed/${book.title}/400/600`,
      };
      
      setBooks(prev => [newBook, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add book');
      throw err;
    }
  };

  const updateBook = async (id: string, book: Omit<Book, 'id'>) => {
    try {
      setError(null);
      await bookApi.updateBook(id, {
        title: book.title,
        description: book.description,
        author: book.author,
        publishedDate: book.publishedDate,
        rating: book.rating,
        coverUrl: book.coverUrl,
      });

      // Обновляем локально
      setBooks(prev => prev.map(b => (b.id === id ? { ...book, id } : b)));
      setSelectedBook(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update book');
      throw err;
    }
  };

  const deleteBook = async (id: string) => {
    try {
      setError(null);
      await bookApi.deleteBook(id);
      
      // Удаляем локально
      setBooks(prev => prev.filter(b => b.id !== id));
      setSelectedBook(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete book');
      throw err;
    }
  };

  const refreshBooks = async () => {
    await fetchBooks();
  };

  return (
    <LibraryContext.Provider
      value={{
        books,
        loading,
        error,
        selectedBook,
        setSelectedBook,
        addBook,
        updateBook,
        deleteBook,
        refreshBooks,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = (): LibraryContextType => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within LibraryProvider');
  }
  return context;
};