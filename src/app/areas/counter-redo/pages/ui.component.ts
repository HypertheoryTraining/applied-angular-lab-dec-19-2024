import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CounterStore } from '../services/counter-store';

@Component({
  selector: 'app-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <button
        [disabled]="store.decrementDisabled()"
        (click)="store.decrement()"
        class="btn btn-primary"
      >
        -
      </button>
      <span data-testid="current">{{ store.current() }}</span>
      <button
        (click)="store.increment()"
        class="btn btn-primary"
        style="margin-right: 10px;"
      >
        +
      </button>
      <button
        (click)="store.reset()"
        class="btn btn-secondary btn-sm"
        style="margin-bottom: 30px;"
      >
        Reset
      </button>
    </div>

    <div class="text col-span-6">
      <span class="text bg-red-500">{{ store.fizzBuzz() }}</span>
    </div>
  `,
  styles: ``,
})
export class UiComponent {
  store = inject(CounterStore);
}
