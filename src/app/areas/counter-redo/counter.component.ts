import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-counter-redo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div>
      Counter Stuff Goes Here
      <a routerLink="ui">UI</a>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class CounterComponent {}
