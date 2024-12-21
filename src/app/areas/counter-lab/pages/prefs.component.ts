import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
} from '@angular/core';
import { CounterStore } from '../services/counter-store';

@Component({
  selector: 'app-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="max-w-md mx-auto">
      <div id="count-tab" role="tablist" class="tabs tabs-boxed ">
        @for (option of store.countOptions(); track option) {
          @if (option === store.countBy()) {
            <a
              role="tab"
              class="tab tab-active"
              tabindex="0"
              (click)="store.setCountBy(option)"
              (keydown.enter)="store.setCountBy(option)"
              >{{ option }}</a
            >
          } @else {
            <a
              role="tab"
              class="tab"
              tabindex="0"
              (click)="store.setCountBy(option)"
              (keydown.enter)="store.setCountBy(option)"
              >{{ option }}</a
            >
          }
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class PrefsComponent {
  store = inject(CounterStore);

  activeTabClass = computed(() => {
    const baseClass = 'tab';
    return this.store.countBy() === 3 ? `${baseClass} tab-active` : baseClass;
  });
}
