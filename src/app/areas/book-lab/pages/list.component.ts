import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BookStore } from '../services/book.store';

@Component({
  selector: 'app-book-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div class="overflow-x-auto">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Year Published</th>
        </tr>
      </thead>
      <tbody>
        @if (store.books().length === 0) {
          <span class="alert alert-warning m-auto">No books to display</span>
        } @else {
          @for (book of store.books(); track book.id) {
            <tr>
              <th>{{ book.id }}</th>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
            </tr>
          }
        }
      </tbody>
    </table>
  </div>`,
  styles: ``,
})
export class ListComponent {
  store = inject(BookStore);
}
