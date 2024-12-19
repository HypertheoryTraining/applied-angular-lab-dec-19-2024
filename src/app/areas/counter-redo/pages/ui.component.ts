import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-counter-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <button
        [disabled]="store.disabled()"
        (click)="store.decrement()"
        class="btn btn-primary"
      >
        -
      </button>
      <span data-testid="current">{{ store.count() }}</span>
      <button (click)="store.increment()" class="btn btn-primary">+</button>
      <br />
      <span data-testid="fizzBuzz">{{ store.fizzBuzz() }}</span>
    </div>
  `,
  styles: ``,
})
export class UiComponent {
  store = inject(CounterStore);
}
