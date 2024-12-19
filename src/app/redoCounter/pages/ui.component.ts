import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';

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
      <span data-testid="current">{{ counter() }}</span>
      <button class="btn btn-primary" (click)="increment()">+</button>
    </div>
  `,
  styles: [
    `
      .btn {
        padding: 10px;
        margin: 5px;
        font-size: 18px;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        justify-content: center;
      }
    `,
  ],
})
export class UiComponent {
  counter = signal(0);

  isDecrementDisabled = computed(() => this.counter() <= 0);

  increment() {
    this.counter.update((value) => value + 1);
  }

  decrement() {
    if (this.counter() > 0) {
      this.counter.update((value) => value - 1);
    }
  }
}
