import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Book } from "../types/Book.js";
import { bookApi } from "../api/bookApi.js";
import { bookCoverStorage } from "../utils/bookCoverStorage.js";

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
  seedBooks: () => Promise<void>;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const seedBooks = async () => {
    try {
      setLoading(true);

      const genres = ['fiction', 'classics', 'mystery', 'drama', 'fantasy', 'history'];
      const randomGenre = genres[Math.floor(Math.random() * genres.length)];
      
      console.log(`Ищу книги в жанре: ${randomGenre}`);

      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${randomGenre}&maxResults=10&printType=books`);
      const data = await response.json();

      if (!data.items) return;

      let addedCount = 0;

      for (const item of data.items) {
        const v = item.volumeInfo;

        const isAlreadyExists = books.some(
          (existingBook) => existingBook.title.toLowerCase() === v.title.toLowerCase()
        );

        if (isAlreadyExists) {
          console.log(`Книга "${v.title}" уже есть в библиотеке, пропускаю.`);
          continue;
        }

        let rawDate = v.publishedDate || "2020-01-01";
        if (rawDate.length === 4) rawDate = `${rawDate}-01-01`;

        // Генерируем обложку
        const coverUrl = v.imageLinks?.thumbnail?.replace('http:', 'https:') || 
                         `https://picsum.photos/seed/${Math.random()}/400/600`;

        await addBook({
          title: v.title,
          author: v.authors?.[0] || "Unknown Author",
          description: v.description?.slice(0, 200) || "Great book description.",
          publishedDate: new Date(rawDate).toISOString(),
          rating: 5,
          coverUrl: coverUrl
        });

        addedCount++;
        
        if (addedCount >= 5) break;
      }

      if (addedCount === 0) {
        alert('Все книги из этого запроса уже есть в твоей библиотеке!');
      } else {
        alert(`Успешно добавлено ${addedCount} новых книг в жанре ${randomGenre}!`);
      }

    } catch (err) {
      console.error("Seed error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка книг при монтировании
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookApi.getAllBooks();
      
      // Для каждой книги проверяем, есть ли сохраненная обложка в localStorage
      const booksWithCovers = data.map(book => {
        const savedCover = bookCoverStorage.getCover(book.id);
        
        return {
          ...book,
          coverUrl: savedCover || book.coverUrl || `https://picsum.photos/seed/${book.title}/400/600`
        };
      });
      
      setBooks(booksWithCovers);
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

      // Генерируем обложку если её нет
      const finalCoverUrl = book.coverUrl || `https://picsum.photos/seed/${book.title}/400/600`;

      // Сохраняем обложку в localStorage
      bookCoverStorage.saveCover(newBookId, finalCoverUrl);

      // Добавляем книгу локально
      const newBook: Book = {
        ...book,
        id: newBookId,
        coverUrl: finalCoverUrl,
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

      // Если обложка изменилась, обновляем её в localStorage
      if (book.coverUrl) {
        bookCoverStorage.saveCover(id, book.coverUrl);
      }

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
      
      // Удаляем обложку из localStorage
      bookCoverStorage.removeCover(id);
      
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
        seedBooks,
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