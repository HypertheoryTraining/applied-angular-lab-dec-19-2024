import { inject, signal } from '@angular/core';
import { BooksStore } from './books.store';
import { BooksApiResponseItem } from '../types';

export type sortOrder = 'asc' | 'desc' | 'nope';
export class BooksService {
  store = inject(BooksStore);
  books = this.store.books;
  sortOrder = signal<sortOrder>('nope');

  booksByYear(ord: string): BooksApiResponseItem[] {
    return this.books().sort((a, b) =>
      ord === 'desc' ? b.year - a.year : a.year - b.year,
    );
  }

  booksByAuthor(ord: string): BooksApiResponseItem[] {
    return this.books().sort((a, b) =>
      this.compareStrings(a.author, b.author, ord),
    );
  }

  booksByTitle(ord: string): BooksApiResponseItem[] {
    return this.books().sort((a, b) =>
      this.compareStrings(a.title, b.title, ord),
    );
  }

  private compareStrings(
    compareStringA: string,
    compareStringB: string,
    ord: string,
  ): number {
    const a = compareStringA.toUpperCase();
    const b = compareStringB.toUpperCase();

    if (a > b) {
      return ord === 'desc' ? -1 : 1;
    }
    if (b > a) {
      return ord === 'desc' ? 1 : -1;
    }
    return 0;
  }
}
