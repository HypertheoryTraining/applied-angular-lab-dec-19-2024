import {
  Component,
  ChangeDetectionStrategy,
  resource,
  computed,
} from '@angular/core';
import { BookEntity } from '../types';

@Component({
  selector: 'app-stats-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <div>Total Number of Books: {{ books.value()?.length }}</div>
      <div>Earliest published book in Library: {{ getEarliest() }}</div>
      <div>Most recent published book in Library: {{ getLatest() }}</div>
      <div>Average Pages: {{ getAveragePages() }}</div>
    </div>
  `,
  styles: ``,
})
export class StatsComponent {
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });

  // This is throwing errors, probably trying to run before the list is initialized.
  getEarliest = computed(() => {
    return this.books.value()!.reduce((minYear, book) => {
      return book.year < minYear ? book.year : minYear;
    }, this.books.value()![0].year);
  });

  getLatest = computed(() => {
    return this.books.value()!.reduce((biggestYear, book) => {
      return book.year > biggestYear ? book.year : biggestYear;
    }, this.books.value()![0].year);
  });

  getAveragePages = computed(() => {
    return this.books.value()!.reduce((average, book) => {
      return (book.pages + average) / 2 ? book.pages : average;
    }, this.books.value()![0].pages);
  });
}
