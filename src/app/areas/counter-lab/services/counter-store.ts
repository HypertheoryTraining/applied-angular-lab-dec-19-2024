import {
  withDevtools,
  withStorageSync,
} from '@angular-architects/ngrx-toolkit';
import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

export const COUNT_OPTIONS = [1, 3, 5] as const;
type CountOptions = (typeof COUNT_OPTIONS)[number];

type CounterState = {
  count: number;
  countBy: CountOptions;
};

export const CounterStore = signalStore(
  withDevtools('counter'),
  withStorageSync('counter'),
  withState<CounterState>({ count: 0, countBy: 1 }),
  withMethods((store) => {
    return {
      increment: () =>
        patchState(store, { count: store.count() + store.countBy() }),
      decrement: () =>
        patchState(store, {
          count:
            store.count() - store.countBy() <= 0
              ? 0
              : store.count() - store.countBy(),
        }),
      setCountBy: (countBy: CountOptions) => patchState(store, { countBy }),
      reset: () => patchState(store, { count: 0, countBy: 1 }),
    };
  }),
  withComputed((store) => {
    return {
      disableDecrement: computed(() => store.count() === 0),
      fizzBuzz: computed(() =>
        store.count() === 0
          ? ''
          : (store.count() % 3 === 0 ? 'Fizz' : '') +
            (store.count() % 5 === 0 ? 'Buzz' : ''),
      ),
      countOptions: computed(() => COUNT_OPTIONS),
    };
  }),
);
