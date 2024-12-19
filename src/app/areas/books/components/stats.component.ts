import {
  Component,
  ChangeDetectionStrategy,
  resource,
  inject,
  computed,
} from '@angular/core';
import { BOOKS_API_GET } from '../services/books.api';
import { BooksApiResponse } from '../types';
import { BooksStore } from '../services/books.store';

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Number of Books: {{ numberOfBooks() }}</p>
    <p>The eldest of books: {{ eldestBook()?.title }}</p>
    <p>The youngest of books: {{ youngestBook()?.title }}</p>
    <p>Average pages: {{ averagePages() }}</p>
  `,
  styles: ``,
})
export class StatsComponent {
  booksStore = inject(BooksStore);

  books = resource<BooksApiResponse, unknown>({
    loader: () =>
      fetch(BOOKS_API_GET)
        .then((r) => r.json())
        .then((r) => r.data),
  });

  numberOfBooks = computed(() => this.books.value()?.length);
  booksByDate = computed(() =>
    this.books.value()?.sort((a, b) => a.year - b.year),
  );
  eldestBook = computed(() =>
    (this.numberOfBooks() ?? 0) > 0 ? this.booksByDate()?.[0] : null,
  );
  youngestBook = computed(() =>
    (this.numberOfBooks() ?? 0) > 0
      ? this.booksByDate()?.[(this.numberOfBooks() ?? 1) - 1]
      : null,
  );
  averagePages = computed(() => {
    const books = this.books.value();
    return books
      ? books.reduce((acc, book) => acc + book.pages, 0) / books.length
      : 0;
  });
}
