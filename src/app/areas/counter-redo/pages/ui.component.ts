import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
//import { withComputed } from '@ngrx/signals';

@Component({
  selector: 'app-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <button
        class="btn btn-primary"
        (click)="minus()"
        [disabled]="shouldDisable()"
      >
        -
      </button>
      <span data-testid="current">{{ current() }}</span>
      <button class="btn btn-primary" (click)="add()">+</button>
    </div>
    <span data-testid="fizzBuzz">{{ displayFizzBuzz() }}</span>
  `,
  styles: ``,
})
export class UiComponent {
  current = signal(0);
  isDisabled = false;

  add() {
    this.current.set(this.current() + 1);
  }
  minus() {
    this.current.update((j) => j - 1);
  }
  shouldDisable() {
    return this.current() === 0;
  }
  displayFizzBuzz() {
    const curVal = this.current();
    if (curVal === 0) return '';
    if (curVal % 3 === 0 && curVal % 5 === 0) return 'FizzBuzz';
    if (curVal % 3 === 0) return 'Fizz';
    if (curVal % 5 === 0) return 'Buzz';

    return '';
  }
}
