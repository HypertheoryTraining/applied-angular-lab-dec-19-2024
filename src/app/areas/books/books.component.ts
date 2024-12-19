import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="flex gap-4">
      <a routerLink="list">List</a>
      <a routerLink="stats">Stats</a>
      <a routerLink="prefs">Preferences</a>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class BooksComponent {}
