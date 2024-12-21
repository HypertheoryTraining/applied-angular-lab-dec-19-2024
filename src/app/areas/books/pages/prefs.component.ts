import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BooksStore } from '../services/books-store';

@Component({
  selector: 'app-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="max-w-md mx-auto">
      <div class="stat-value text-primary text-lg">Sort By:</div>
      <div id="count-tab" role="tablist" class="tabs tabs-boxed ">
        @for (option of store.columnPrefs(); track option) {
          @if (option === store.column()) {
            <a
              role="tab"
              class="tab tab-active"
              tabindex="0"
              (click)="store.setColumnPref(option)"
              (keydown.enter)="store.setColumnPref(option)"
              >{{ option }}</a
            >
          } @else {
            <a
              role="tab"
              class="tab"
              tabindex="0"
              (click)="store.setColumnPref(option)"
              (keydown.enter)="store.setColumnPref(option)"
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
  store = inject(BooksStore);
}
