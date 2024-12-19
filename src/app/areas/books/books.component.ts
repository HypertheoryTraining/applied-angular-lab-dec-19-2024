import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="flex gap-4">
      <button class="btn btn-neutral" routerLink=".">Books List</button>
      <button class="btn btn-neutral" routerLink="stats">Stats</button>
      <button class="btn btn-neutral" routerLink="prefs">Prefs</button>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class BooksComponent {}
