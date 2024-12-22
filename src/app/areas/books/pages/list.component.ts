import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BooksStore, ColumnPrefs } from '../services/books-store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="flex justify-center">
      <div class="bg-base-200 p-4 rounded-lg shadow-lg">
        <div class="overflow-x-auto max-h-[80vh] max-w-[90vh] min-w-[70vw]">
          <table
            class="table table-zebra table-pin-rows bg-base-300  font-medium"
          >
            <thead class="">
              <tr class="bg-neutral ">
                <th class="cursor-pointer" (click)="handleSort('id')">
                  <div class="flex flex-nowrap ">
                    Id
                    @if (store.column() === 'id') {
                      @if (store.ascending()) {
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-4 mx-2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </div>
                      } @else {
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-4 mx-2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m4.5 15.75 7.5-7.5 7.5 7.5"
                            />
                          </svg>
                        </span>
                      }
                    }
                  </div>
                </th>
                <th class="cursor-pointer" (click)="handleSort('title')">
                  <div class="flex flex-nowrap ">
                    Title
                    @if (store.column() === 'title') {
                      @if (store.ascending()) {
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-4 mx-2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      } @else {
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-4 mx-2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m4.5 15.75 7.5-7.5 7.5 7.5"
                            />
                          </svg>
                        </span>
                      }
                    }
                  </div>
                </th>
                <th class="cursor-pointer" (click)="handleSort('author')">
                  Author
                </th>
                <th class="cursor-pointer" (click)="handleSort('year')">
                  Year
                </th>
              </tr>
            </thead>
            <tbody>
              @for (book of store.books(); track book.id) {
                <tr>
                  <td>{{ book.id }}</td>
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="w-20 rounded">
                          <a class="link" [routerLink]="['details', book.id]"
                            ><img [src]="book.imageLink" alt=""
                          /></a>
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">
                          <a class="link" [routerLink]="['details', book.id]">{{
                            book.title
                          }}</a>
                        </div>
                        <!-- <div class="text-sm opacity-50">{{ book.author }}</div> -->
                      </div>
                    </div>
                    <!-- {{ book.title }} -->
                  </td>
                  <td>{{ book.author }}</td>
                  <td>{{ book.year }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
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
