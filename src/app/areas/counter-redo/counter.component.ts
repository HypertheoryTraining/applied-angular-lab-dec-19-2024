import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-counter-redo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `<div class="flex gap-4">
    <a routerLink="New Counter Redo Stuff Goes here">CounterStuff</a>
  </div>`,
  styles: ``,
})
export class CounterComponent {}
