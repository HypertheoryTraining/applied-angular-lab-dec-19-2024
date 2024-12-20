import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BookApiResponse } from '../types';

export class BookApi {
  #http = inject(HttpClient);
  getBooks() {
    return this.#http.get<BookApiResponse>('/api/books');
  }
}
