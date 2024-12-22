import { HttpResponse, http } from 'msw';
import books from './books';
import { BookEntity } from '../app/areas/books/types';

const handlers = [
  http.get('/api/books', () => {
    return HttpResponse.json({ data: books });
  }),
  http.post('/api/books', async ({ request }) => {
    const body = (await request.json()) as BookEntity;
    const newBook = {
      ...body,
      id: String(books.length + 1),
      imageLink: 'assets/images/placeholder.jpg',
      language: 'English',
      country: 'Unknown',
      pages: 0,
      link: '',
      custom: true,
    };
    books.push(newBook);
    return HttpResponse.json(newBook);
  }),
  http.delete('/api/books/:id', ({ params }) => {
    const { id } = params;
    const index = books.findIndex((b) => b.id === id);
    if (index > -1) {
      books.splice(index, 1);
    }
    return HttpResponse.json({ success: true });
  }),
];

export default handlers;
