import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BookStore } from './services/book.store';

@Component({
  selector: 'app-book',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="flex gap-4">
      <a class="btn btn-secondary" routerLink="stats"
        >View book statistics here</a
      >
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class BookComponent {
  store = inject(BookStore);
}
