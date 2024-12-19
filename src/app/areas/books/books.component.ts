import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex gap-4">
      <a routerLink="list">List</a>
      <a routerLink="stats">Stats</a>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class BooksComponent {}
