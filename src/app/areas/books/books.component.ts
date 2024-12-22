import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BooksStore } from './services/books-store';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex flex-col items-center my-3">
      <div class="join">
        <a class="join-item btn" routerLink="../books">List</a>
        <a class="join-item btn" routerLink="stats">Stats</a>
        <a class="join-item btn" routerLink="prefs">Prefs</a>
        <a class="join-item btn" [routerLink]="['details', book()?.id]"
          >Details</a
        >
      </div>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class BooksComponent {
  store = inject(BooksStore);
  book = this.store.selectedBook;
}
