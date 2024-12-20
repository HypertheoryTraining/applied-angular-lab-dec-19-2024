import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksStore } from '../services/books.store';

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Number of Books: {{ booksStore.numberOfBooks() }}</p>
    <p>The eldest of books: {{ booksStore.eldestBook().title }}</p>
    <p>The youngest of books: {{ booksStore.youngestBook().title }}</p>
    <p>Average pages: {{ booksStore.averagePages() }}</p>
  `,
  styles: ``,
})
export class StatsComponent {
  booksStore = inject(BooksStore);
}
