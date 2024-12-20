import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { BooksStore } from '../services/books-store';

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="bg-base-200 p-4">
      <div>Total Books: {{ totalBooks() }}</div>
      <div>Oldest Published: {{ earlistBook() }}</div>
      <div>Newest Published: {{ newestBook() }}</div>
      <div>Average Pages: {{ avergaePages() }}</div>
    </div>
  `,
  styles: ``,
})
export class StatsComponent {
  store = inject(BooksStore);
  books = this.store.books;

  totalBooks = computed(() => this.books().length);

  earlistBook = computed(() => {
    return this.books().reduce(
      (minYear, book) => (book.year < minYear ? book.year : minYear),
      this.books()?.[0]?.year,
    );
  });

  newestBook = computed(() => {
    return this.books().reduce(
      (maxYear, book) => (book.year > maxYear ? book.year : maxYear),
      this.books()?.[0]?.year,
    );
  });

  avergaePages = computed(() => {
    return Math.round(
      this.books().reduce((total, book) => total + book.pages, 0) /
        this.totalBooks(),
    );
  });
}
