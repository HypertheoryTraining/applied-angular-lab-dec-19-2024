import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CounterStoreService } from '../services/counter-store';

@Component({
  selector: 'app-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <button
        class="btn btn-primary"
        (click)="decrement()"
        [disabled]="isDecrementDisabled()"
      >
        -
      </button>
      <span data-testid="current">{{ counterStore.counter() }}</span>
      <button class="btn btn-primary" (click)="increment()">+</button>
      <div data-testid="fizzBuzz">
        {{ fizzBuzzValue() }}
      </div>
    </div>
  `,
  styles: ``,
})
export class UiComponent {
  constructor(public counterStore: CounterStoreService) {}
  //State for the counter
  // counter = signal(0);

  //Computed signal for FizzBuzz logic
  fizzBuzzValue = computed(() => {
    const value = this.counterStore.counter();
    if (value === 0) return '';
    if (value % 3 === 0 && value % 5 === 0) return 'FizzBuzz';
    if (value % 3 === 0) return 'Fizz';
    if (value % 5 === 0) return 'Buzz';
    return '';
  });

  //Computed signal to check if decrement
  isDecrementDisabled = computed(() => this.counterStore.counter() === 0);

  //Increment function
  increment() {
    this.counterStore.increment();
  }

  //Decrement function (prevents going below zero)
  decrement() {
    if (this.counterStore.counter() > 0) {
      this.counterStore.decrement();
    }
  }
}
