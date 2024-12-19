import {
  Component,
  ChangeDetectionStrategy,
  resource,
  computed,
} from '@angular/core';
import { BookApiResponse, BookEntity } from './list.component';

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
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r: BookApiResponse) => r.data),
  });

  totalBooks = computed(() => this.books.value()?.length);
  earlistBook = computed(() => {
    return this.books
      .value()
      ?.reduce(
        (minYear, book) => (book.year < minYear ? book.year : minYear),
        this.books.value()?.[0]?.year ?? 0,
      );
  });
  newestBook = computed(() => {
    return this.books
      .value()
      ?.reduce(
        (maxYear, book) => (book.year > maxYear ? book.year : maxYear),
        this.books.value()?.[0]?.year ?? 0,
      );
  });

  avergaePages = computed(() => {
    return Math.round(
      (this.books.value()?.reduce((total, book) => total + book.pages, 0) ??
        1) / (this.totalBooks() ?? 1),
    );
  });
}
