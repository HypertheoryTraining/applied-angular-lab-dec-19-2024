import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-counter-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @for (interval of store.allowedIntervals(); track interval) {
      <button
        (click)="store.changeInterval(interval)"
        class="btn btn-secondary m-auto"
      >
        Count by {{ interval }}
      </button>
    }
  `,
  styles: ``,
})
export class PrefsComponent {
  store = inject(CounterStore);
}
