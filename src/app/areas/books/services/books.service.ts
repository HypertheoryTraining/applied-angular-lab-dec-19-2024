import { inject } from '@angular/core';
import { BooksStore } from './books.store';
import { BooksApiResponseItem } from '../types';

export class BooksService {
  store = inject(BooksStore);
  books = this.store.books;

  booksByYear(ord: string): BooksApiResponseItem[] {
    return this.books().sort((a, b) =>
      ord === 'desc' ? b.year - a.year : a.year - b.year,
    );
  }

  booksByAuthor(ord: string): BooksApiResponseItem[] {
    return this.books().sort((a, b) => {
      const authorA = a.author.toUpperCase();
      const authorB = b.author.toUpperCase();

      if (authorA > authorB) {
        return ord === 'desc' ? -1 : 1;
      }
      if (authorB > authorA) {
        return ord === 'desc' ? 1 : -1;
      }
      return 0;
    });
  }

  booksByTitle(ord: string): BooksApiResponseItem[] {
    return this.books().sort((a, b) => {
      const authorA = a.author.toUpperCase();
      const authorB = b.author.toUpperCase();

      if (authorA > authorB) {
        return ord === 'desc' ? -1 : 1;
      }
      if (authorB > authorA) {
        return ord === 'desc' ? 1 : -1;
      }
      return 0;
    });
  }
}
