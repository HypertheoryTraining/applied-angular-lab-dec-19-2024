import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-counter-redo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div>Counter Stuff Goes Here</div>
    <div>
      <a routerLink="ui">UI</a>
    </div>
    <div>
      <a routerLink="prefs">Prefs</a>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class CounterComponent {}
