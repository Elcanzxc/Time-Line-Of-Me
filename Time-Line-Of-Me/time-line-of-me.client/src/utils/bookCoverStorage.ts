// utils/bookCoverStorage.ts

const STORAGE_KEY = 'book_covers';

interface BookCovers {
  [bookId: string]: string;
}

export const bookCoverStorage = {
  // Получить URL обложки по ID книги
  getCover: (bookId: string): string | null => {
    try {
      const covers = localStorage.getItem(STORAGE_KEY);
      if (!covers) return null;
      
      const parsedCovers: BookCovers = JSON.parse(covers);
      return parsedCovers[bookId] || null;
    } catch (error) {
      console.error('Error reading cover from localStorage:', error);
      return null;
    }
  },

  // Сохранить URL обложки для книги
  saveCover: (bookId: string, coverUrl: string): void => {
    try {
      const covers = localStorage.getItem(STORAGE_KEY);
      const parsedCovers: BookCovers = covers ? JSON.parse(covers) : {};
      
      parsedCovers[bookId] = coverUrl;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedCovers));
    } catch (error) {
      console.error('Error saving cover to localStorage:', error);
    }
  },

  // Удалить обложку книги
  removeCover: (bookId: string): void => {
    try {
      const covers = localStorage.getItem(STORAGE_KEY);
      if (!covers) return;
      
      const parsedCovers: BookCovers = JSON.parse(covers);
      delete parsedCovers[bookId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedCovers));
    } catch (error) {
      console.error('Error removing cover from localStorage:', error);
    }
  },

  // Получить все обложки
  getAllCovers: (): BookCovers => {
    try {
      const covers = localStorage.getItem(STORAGE_KEY);
      return covers ? JSON.parse(covers) : {};
    } catch (error) {
      console.error('Error reading all covers from localStorage:', error);
      return {};
    }
  },

  // Очистить все обложки
  clearAll: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing covers from localStorage:', error);
    }
  }
};