import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksStore } from '../services/books.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
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
            <th>
              <a
                class="link"
                routerLink="."
                [queryParams]="{
                  sort: 'title',
                  order: booksStore.sort.order(),
                }"
                (click)="
                  booksStore.updateSort({
                    by: 'title',
                    order: booksStore.sort.order(),
                  })
                "
                >Title</a
              >
            </th>
            <th>
              <a
                class="link"
                routerLink="."
                [queryParams]="{ sort: 'author', order: 'asc' }"
                >Author</a
              >
            </th>
            <th>
              <a
                class="link"
                routerLink="."
                [queryParams]="{ sort: 'year', order: 'asc' }"
                >Year</a
              >
            </th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          @for (book of this.booksStore.books(); track book.id) {
            <tr>
              <td>
                <a routerLink="">{{ book.title }}</a>
              </td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
              <td>
                <a class="link" href="{{ book.link }}"
                  >Probably goes to wikipedia</a
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
  booksStore = inject(BooksStore);
}
