import { signal } from '@angular/core';
import { BooksApiResponseItem } from '../types';

export type SortOrder = 'asc' | 'desc' | 'nope';
export type Sort = {
  by: string | null;
  order: SortOrder;
};

export class BooksService {
  sortOrder = signal<SortOrder>('nope');

  booksByYear(
    books: BooksApiResponseItem[],
    order: string,
  ): BooksApiResponseItem[] {
    return books.sort((a, b) =>
      order === 'desc' ? b.year - a.year : a.year - b.year,
    );
  }

  booksByAuthor(
    books: BooksApiResponseItem[],
    order: string,
  ): BooksApiResponseItem[] {
    return books.sort((a, b) => this.compareStrings(a.author, b.author, order));
  }

  booksByTitle(
    books: BooksApiResponseItem[],
    order: string,
  ): BooksApiResponseItem[] {
    return books.sort((a, b) => this.compareStrings(a.title, b.title, order));
  }

  private compareStrings(
    compareStringA: string,
    compareStringB: string,
    order: string,
  ): number {
    const a = compareStringA.toUpperCase();
    const b = compareStringB.toUpperCase();

    if (a > b) {
      return order === 'desc' ? -1 : 1;
    }
    if (b > a) {
      return order === 'desc' ? 1 : -1;
    }
    return 0;
  }
}
