import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <button
        [disabled]="store.isDecrementDisabled()"
        (click)="store.decrement()"
        class="btn btn-primary mr-4"
      >
        -
      </button>
      <span data-testid="current">{{ store.currentValue() }}</span>
      <button (click)="store.increment()" class="btn btn-primary ml-4">
        +
      </button>
    </div>
    <div>{{ store.fizzBuzz() }}</div>
  `,
  styles: ``,
})
export class UiComponent {
  store = inject(CounterStore);
}
