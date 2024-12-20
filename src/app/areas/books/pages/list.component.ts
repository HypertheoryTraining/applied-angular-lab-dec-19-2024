import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BooksStore, ColumnPrefs } from '../services/books-store';


@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th (click)="handleSort('id')">Id</th>
            <th (click)="handleSort('title')">Title</th>
            <th (click)="handleSort('author')">Author</th>
            <th (click)="handleSort('year')">Year</th>
          </tr>
        </thead>
        <tbody>
          @for (book of store.books(); track book.id) {
            <tr>
              <td>{{ book.id }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class ListComponent {
  store = inject(BooksStore);
  books = this.store.books;

  handleSort(column: ColumnPrefs) {
    if (this.store.column() === column) {
      this.store.setDirection(!this.store.ascending());
    }
    this.store.setColumnPref(column);
  }
}
