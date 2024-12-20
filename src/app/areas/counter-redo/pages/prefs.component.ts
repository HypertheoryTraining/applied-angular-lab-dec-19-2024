import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `<div>
    <span class="mr-4">Count by:</span>

    @for (option of store.countByOptions(); track $index) {
      <button
        [disabled]="store.countBy() === option"
        (click)="store.setCountBy(option)"
        class="btn btn-lg join-item"
      >
        {{ option }}
      </button>
    }
  </div>`,
  styles: ``,
})
export class PrefsComponent {
  store = inject(CounterStore);
}
