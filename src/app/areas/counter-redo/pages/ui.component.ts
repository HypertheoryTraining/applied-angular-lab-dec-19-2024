import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { withComputed } from '@ngrx/signals';

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
    console.log(this.isDisabled);
    this.current.update((j) => j - 1);
    //this.shouldDisable();
  }
  shouldDisable() {
    console.log(this.current());
    //this.isDisabled.set(this.current() === 0);
    //this.isDisabled = this.current() === 0;
    return this.current() === 0;
  }
}
