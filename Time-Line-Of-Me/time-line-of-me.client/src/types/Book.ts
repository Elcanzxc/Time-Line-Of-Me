export interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  coverUrl?: string;
  rating?: number;
}


export interface BookRequest {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
}

export interface BooksResponse extends Book {}