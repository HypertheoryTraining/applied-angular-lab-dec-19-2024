import {
  Component,
  ChangeDetectionStrategy,
  resource,
  computed,
} from '@angular/core';
import { BookEntity } from '../types';

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `<div class="stats stats-vertical shadow">
    <div class="stat">
      <div class="stat-title">Books</div>
      <div class="stat-value">{{ totalBooks() }}</div>
      <div class="stat-desc">Total number of books</div>
    </div>

    <div class="stat">
      <div class="stat-title">First published</div>
      <div class="stat-value">{{ earliestYear() }}</div>
      <div class="stat-desc">↗Earliest year a book was published</div>
    </div>

    <div class="stat">
      <div class="stat-title">Recently published</div>
      <div class="stat-value">{{ latestYear() }}</div>
      <div class="stat-desc">Most recent year that a book was published</div>
    </div>

    <div class="stat">
      <div class="stat-title">Pages</div>
      <div class="stat-value">{{ averagePages() }}</div>
      <div class="stat-desc">Average number of pages of all the books</div>
    </div>
  </div>`,
  styles: ``,
})
export class StatsComponent {
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });

  private get validBooks(): BookEntity[] | null {
    const books = this.books.value();
    return books && books.length > 0 ? books : null;
  }

  totalBooks = computed(() => {
    return this.validBooks ? this.validBooks.length : 'N/A';
  });

  earliestYear = computed(() => {
    return this.validBooks
      ? this.validBooks.reduce(
          (min, book) => Math.min(min, book.year),
          Infinity,
        )
      : 'N/A';
  });

  latestYear = computed(() => {
    return this.validBooks
      ? this.validBooks.reduce(
          (max, book) => Math.max(max, book.year),
          -Infinity,
        )
      : 'N/A';
  });

  averagePages = computed(() => {
    if (!this.validBooks) return 'N/A';
    const totalPages = this.validBooks.reduce(
      (sum, book) => sum + book.pages,
      0,
    );
    return Math.round(totalPages / this.validBooks.length);
  });
}
