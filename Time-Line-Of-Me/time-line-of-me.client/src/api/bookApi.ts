import type { Book, BookRequest, BooksResponse } from '../types/Book.js';
import { API_BASE_URL } from '../utils/constants.js';



class BookApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }



   async getAllBooks(): Promise<Book[]> {
    try {
      const response = await fetch(`${this.baseUrl}/Books`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BooksResponse[] = await response.json();
      
      // Преобразуем данные и добавляем coverUrl
      return data.map(book => ({
        ...book,
        coverUrl: `https://picsum.photos/seed/${book.title}/400/600`,
        rating: Math.floor(Math.random() * 2) + 4, // Временно: случайный рейтинг 4-5
      }));
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }


    // Создать новую книгу
  async createBook(book: BookRequest & { rating?: number | undefined; coverUrl?: string | undefined }): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/Books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: book.title,
          description: book.description,
          author: book.author,
          publishedDate: book.publishedDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const bookId: string = await response.json();
      return bookId;
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  }

  // Обновить книгу
  async updateBook(id: string, book: BookRequest & { rating?: number | undefined; coverUrl?: string | undefined }): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/Books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: book.title,
          description: book.description,
          author: book.author,
          publishedDate: book.publishedDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedId: string = await response.json();
      return updatedId;
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  }

  // Удалить книгу
  async deleteBook(id: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/Books/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const deletedId: string = await response.json();
      return deletedId;
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }
}

export const bookApi = new BookApiService(API_BASE_URL);