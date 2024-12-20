import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { CounterStore1 } from '../services/counter.store';
//import { withComputed } from '@ngrx/signals';

@Component({
  selector: 'app-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <button
        class="btn btn-primary"
        (click)="store.minus()"
        [disabled]="this.store.isDecrementDisabled()"
      >
        -
      </button>
      <span data-testid="current">{{ store.current() }}</span>
      <button class="btn btn-primary" (click)="store.add()">+</button>
    </div>
    <span data-testid="fizzBuzz">{{
      this.store.DisplayfizzBuzzMessage()
    }}</span>
  `,
  styles: ``,
})
export class UiComponent {
  store = inject(CounterStore1);
}
