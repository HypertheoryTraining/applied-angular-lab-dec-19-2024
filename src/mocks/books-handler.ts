import { HttpResponse, http } from 'msw';
import books from './books';
import { BOOKS_API_GET } from '../app/areas/books/services/books.api';

export const booksHandlers = [
  http.get(BOOKS_API_GET, () => {
    return HttpResponse.json({ data: books });
  }),
];