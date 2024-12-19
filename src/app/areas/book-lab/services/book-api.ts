import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BookApiResponse } from '../types';
import { map } from 'rxjs';

export class BookApi {
  #http = inject(HttpClient);
  getBooks() {
    return this.#http
      .get<{ data: BookApiResponse }>('/api/books')
      .pipe(map((r) => r.data));
  }
}
