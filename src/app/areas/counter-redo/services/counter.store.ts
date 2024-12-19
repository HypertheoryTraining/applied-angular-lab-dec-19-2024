import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

export const ALLOWED_INTERVALS = [1, 3, 5];
type IntervalValues = (typeof ALLOWED_INTERVALS)[number];

type CounterState = {
  count: number;
  interval: IntervalValues;
};

export const CounterStore = signalStore(
  withDevtools('counter-redo'),
  withState<CounterState>({
    count: 0,
    interval: 1,
  }),
  withMethods((store) => {
    return {
      changeInterval: (interval: IntervalValues) =>
        patchState(store, { interval }),
      increment: () =>
        patchState(store, { count: store.count() + store.interval() }),
      decrement: () =>
        patchState(store, { count: store.count() - store.interval() }),
    };
  }),
  withComputed((store) => {
    return {
      fizzBuzz: computed(() => isFizzBuzz(store.count())),
      disabled: computed(() => store.count() - store.interval() < 0),
      allowedIntervals: computed(() => ALLOWED_INTERVALS),
    };
  }),
);

function isFizzBuzz(count: number): '' | 'Fizz' | 'Buzz' | 'FizzBuzz' {
  if (count === 0) return '';
  else if (count % 3 === 0 && count % 5 === 0) return 'FizzBuzz';
  else if (count % 3 === 0) return 'Fizz';
  else if (count % 5 === 0) return 'Buzz';
  else return '';
}
