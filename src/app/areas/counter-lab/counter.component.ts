import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="flex flex-col items-center my-3">
      <div class="join">
        <a class="join-item btn" routerLink="ui">UI</a>
        <a class="join-item btn" routerLink="prefs">Prefs</a>
      </div>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class CounterComponent {}
