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
    <div class="flex flex-col items-center">
      <div class="stat-value text-primary text-xl">Stats:</div>
      <div class="stats stats-vertical shadow bg-base-200">
        <div class="stat">
          <div class="stat-title">Total Books:</div>
          <div class="stat-value text-primary">{{ totalBooks() }}</div>
          <div class="stat-desc">Every book every written!</div>
        </div>

        <div class="stat">
          <div class="stat-title">Oldest Published:</div>
          <div class="stat-value text-primary">{{ earlistBook() }}</div>
          <div class="stat-desc">{{ earlistBook() < 0 ? 'BC' : 'AD' }}</div>
        </div>

        <div class="stat">
          <div class="stat-title">Newest Published:</div>
          <div class="stat-value text-primary">{{ newestBook() }}</div>
          <div class="stat-desc">{{ newestBook() < 0 ? 'BC' : 'AD' }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Average Length:</div>
          <div class="stat-value text-primary">{{ avergaePages() }}</div>
          <div class="stat-desc">Page Count</div>
        </div>
      </div>
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
