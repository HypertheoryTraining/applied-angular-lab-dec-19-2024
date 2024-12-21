import {
  ChangeDetectionStrategy,
  Component,
  inject,
  computed,
  signal,
} from '@angular/core';
import { CounterStore } from '../services/counter-store';
import { PrefsComponent } from './prefs.component';

@Component({
  selector: 'app-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PrefsComponent],
  template: `
    <div class="flex flex-col items-center ">
      <div class="stats stats-vertical shadow bg-base-300">
        <div class="stat">
          <div class="stat-desc">Count By:</div>
          <div class="stat-actions">
            <app-prefs />
          </div>
        </div>

        <div class="stat flex flex-col items-center ">
          <div class="stat-title">Count:</div>
          <div class="stat-value text-primary">{{ store.count() }}</div>
          <div class="stat-actions space-x-3">
            <button
              class="btn btn-circle btn-outline btn-primary "
              [disabled]="store.disableDecrement()"
              (click)="store.decrement()"
            >
              -{{ store.countBy() }}
            </button>
            <button
              class="btn btn-primary btn-circle btn-outline"
              (click)="store.increment()"
            >
              +{{ store.countBy() }}
            </button>
          </div>
        </div>

        <div class="stat">
          <div
            class="stat-value text-xl text-center "
            [class]="fizzyClass()"
            (click)="onClick()"
            (keydown)="onClick()"
            tabindex="0"
          >
            <span [class]="fizzClass()" class="cursor-pointer">Fizz</span>
            <span [class]="buzzClass()" class="cursor-pointer">Buzz</span>
          </div>
        </div>

        <div class="stat">
          <div class="stat-actions flex flex-col items-center">
            <button
              class="btn btn-sm btn-outline btn-primary"
              (click)="store.reset()"
            >
              Reset
            </button>
          </div>
        </div>
        @if (fizzy() && fizzBuzzAnimation()) {
          <div class="stat flex justify-center">
            <img src="images/fizzbuzz.gif" class=" rounded max-w-24" alt="" />
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class UiComponent {
  store = inject(CounterStore);

  fizzClass = computed(() =>
    this.store.fizzBuzz().includes('Fizz') ? 'text-accent' : 'text-neutral',
  );
  buzzClass = computed(() =>
    this.store.fizzBuzz().includes('Buzz') ? 'text-secondary' : 'text-neutral',
  );
  fizzy = computed(
    () =>
      this.store.fizzBuzz().includes('Fizz') &&
      this.store.fizzBuzz().includes('Buzz'),
  );
  fizzyClass = computed(() =>
    this.fizzy() ? 'hover:animate-bounce animate-pulse' : '',
  );
  fizzBuzzAnimation = signal(false);
  onClick() {
    this.fizzBuzzAnimation.set(!this.fizzBuzzAnimation());
  }
}
