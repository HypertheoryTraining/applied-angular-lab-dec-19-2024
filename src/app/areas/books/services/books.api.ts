import { HttpClient } from '@angular/common/http';
import { BooksApiResponse } from '../types';
import { inject } from '@angular/core';

export const BOOKS_API_GET = '/api/books';

export class BooksApi {
  #http = inject(HttpClient);

  getBooks() {
    return this.#http.get<BooksApiResponse>(BOOKS_API_GET);
  }
}
