import {
  Component,
  ChangeDetectionStrategy,
  inject,
  resource,
} from '@angular/core';
import { BooksStore } from '../services/books.store';
import { BooksApiResponse } from '../types';
import { BOOKS_API_GET } from '../services/books.api';

@Component({
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <!-- <div>
      <select>
        @for (book of this.books.value(); track book.id) {
          <option [value]="book">
            {{ book.title }} by {{ book.author }} published {{ book.year }} with
            {{ book.pages }} pages
          </option>
        }
      </select>
    </div> -->

    <div>
      <table class="table-zebra">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          @for (book of this.books.value(); track book.id) {
            <tr>
              <td>
                <a routerLink="">{{ book.title }}</a>
              </td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
              <td>{{ book.link }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class ListComponent {
  booksStore = inject(BooksStore);

  books = resource<BooksApiResponse, unknown>({
    loader: () =>
      fetch(BOOKS_API_GET)
        .then((r) => r.json())
        .then((r) => r.data),
  });
}
