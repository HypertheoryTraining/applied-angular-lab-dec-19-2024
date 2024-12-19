import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

// type BookApiResponse = {
//   data: BookEntity[];
// };

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `<div>
    <!-- <pre>{{ books.value() | json }}</pre> -->
    <div><a routerLink="list">book list</a></div>
    <div><a routerLink="stats">book stats</a></div>
    <router-outlet />
    <!-- <app-list-component></app-list-component> -->
  </div>`,
  styles: ``,
})
export class BooksComponent {}
