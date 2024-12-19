import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, resource } from '@angular/core';
import { BookEntity } from '../types';

@Component({
  selector: 'app-list-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Country</th>
            <th>Language</th>
            <th>Pages</th>
            <th>ID</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          <!-- *ngFor="let book of books.value()" -->
          @for (book of books.value(); track book.id) {
            <tr>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
              <td>{{ book.country }}</td>
              <td>{{ book.language }}</td>
              <td>{{ book.pages }}</td>
              <td>{{ book.id }}</td>
              <td>
                <a
                  [href]="book.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ book.link }}</a
                >
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class ListComponent {
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });
}
