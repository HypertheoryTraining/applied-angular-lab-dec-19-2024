import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { BooksStore } from './services/books-store';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex flex-col items-center my-3">
      <div role="tablist" class="tabs tabs-boxed">
        <a
          role="tab"
          routerLink="../books"
          routerLinkActive="tab-active"
          [routerLinkActiveOptions]="{ exact: true }"
          class="tab"
          >List</a
        >
        <a
          role="tab"
          routerLink="prefs"
          routerLinkActive="tab-active"
          class="tab"
          >Prefs</a
        >
        <a
          role="tab"
          routerLink="stats"
          routerLinkActive="tab-active"
          class="tab"
          >Stats</a
        >
        <a
          role="tab"
          [routerLink]="['details', book()?.id]"
          routerLinkActive="tab-active"
          class="tab"
          >Details</a
        >
        <a
          role="tab"
          routerLink="entry"
          routerLinkActive="tab-active"
          class="tab"
          >Entry</a
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
