import {
  Component,
  ChangeDetectionStrategy,
  resource,
  signal,
  computed,
} from '@angular/core';
import { BookEntity } from '../types';

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <table class="table">
    <thead>
      <tr>
        <th (click)="sortBooksBy('id')">ID</th>
        <th (click)="sortBooksBy('title')">Title</th>
        <th (click)="sortBooksBy('author')">Author</th>
        <th (click)="sortBooksBy('year')">Year</th>
      </tr>
    </thead>
    <tbody>
      @for (book of sortedBooks(); track book.id) {
        <tr>
          <th>{{ book.id }}</th>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.year }}</td>
        </tr>
      }
    </tbody>
  </table>`,
  styles: ``,
})
export class ListComponent {
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });

  sortOrder = signal<'asc' | 'desc'>('asc');
  sortColumn = signal<keyof BookEntity>('id');

  sortedBooks = computed(() => {
    const books = this.books.value();
    if (!books) return [];

    const order = this.sortOrder();
    const column = this.sortColumn();

    return [...books].sort((a, b) => {
      let value1 = a[column];
      let value2 = b[column];

      if (column === 'id' || column === 'year') {
        value1 = Number(value1);
        value2 = Number(value2);
      }

      if (value1 < value2) return order === 'asc' ? -1 : 1;
      if (value1 > value2) return order === 'asc' ? 1 : -1;
      return 0;
    });
  });

  sortBooksBy(column: keyof BookEntity) {
    if (this.sortColumn() === column) {
      this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortOrder.set('asc');
    }
  }
}
