export const API_BASE_URL = 'https://localhost:7036';


export const QUOTES = [
  { text: "A reader lives a thousand lives before he dies.", author: "George R.R. Martin" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "The only thing that you absolutely have to know is the location of the library.", author: "Albert Einstein" },
  { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
  { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" }
];


export const ROUTES = {
  HOME: '/',
  ADD_BOOK: '/add-book',
  FAVORITES: '/favorites',
} as const;