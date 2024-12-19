import {
  Component,
  ChangeDetectionStrategy,
  resource,
  computed,
} from '@angular/core';

export type BookEntity = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: number;
};

export type BookApiResponse = {
  data: BookEntity[];
};

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th (click)="sortBooks('id')">Id</th>
            <th (click)="sortBooks('title')">Tile</th>
            <th (click)="sortBooks('author')">Author</th>
            <th (click)="sortBooks('year')">Year</th>
          </tr>
        </thead>
        <tbody>
          @for (book of sortedBooks(); track book.id) {
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
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r: BookApiResponse) => r.data),
  });
  sortColumn: keyof BookEntity = 'id';
  sortDirection = true;
  //   sortedBooks = signal<BookEntity[]>(this.books.value() ?? []);
  sortedBooks = computed(() => this.sortBooks(this.sortColumn));

  sortBooks(column: keyof BookEntity) {
    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection;
    }
    this.sortColumn = column;
    return this.books.value()?.sort((a, b) => {
      if (column === 'id' || column === 'year') {
        return this.sortDirection
          ? Number(a[column]) - Number(b[column])
          : Number(b[column]) - Number(a[column]);
      }

      if (this.sortDirection) {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
  }
}
