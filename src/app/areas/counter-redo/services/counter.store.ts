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

type CounterState = {
  currentValue: number;
  countBy: number;
};

export const CounterStore = signalStore(
  withDevtools('read-articles'),
  withState<CounterState>({ countBy: 1, currentValue: 0 }),
  withStorageSync('counter'),
  withMethods((store) => {
    // this space will be used later.
    return {
      increment: () =>
        patchState(store, {
          currentValue: store.currentValue() + store.countBy(),
        }),
      decrement: () =>
        patchState(store, {
          currentValue: store.currentValue() - store.countBy(),
        }),
      setCountBy: (value: number) => {
        patchState(store, { countBy: value });
      },
    };
  }),

  withComputed((store) => {
    return {
      countByOptions: computed(() => [1, 3, 5]),
      isDecrementDisabled: computed(
        () => store.currentValue() - store.countBy() < 0,
      ),
      fizzBuzz: computed(() => {
        if (store.currentValue() === 0) {
          return '';
        }
        const fizz = store.currentValue() % 3 === 0;
        const buzz = store.currentValue() % 5 === 0;
        let value = '';

        if (fizz) {
          value += 'Fizz';
        }
        if (buzz) {
          value += 'Buzz';
        }

        return value;
      }),
    };
  }),
);
