import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BookApiResponse, BookEntity } from '../types';

export class BookApi {
  #http = inject(HttpClient);

  getBooks() {
    return this.#http.get<BookApiResponse>('/api/books');
  }

  addBook(book: Partial<BookEntity>) {
    return this.#http.post<BookEntity>('/api/books', book);
  }

  deleteBook(id: number) {
    return this.#http.delete<{ success: boolean }>(`/api/books/${id}`);
  }
}
