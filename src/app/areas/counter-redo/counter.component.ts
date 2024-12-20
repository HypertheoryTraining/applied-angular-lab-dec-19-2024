import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `<a routerLink="ui" class="mr-5">UI</a
    ><a routerLink="prefs">Prefs</a>

    <router-outlet />`,
  styles: ``,
})
export class CounterComponent {}
