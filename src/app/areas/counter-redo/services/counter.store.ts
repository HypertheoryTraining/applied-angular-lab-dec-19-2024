import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
//import { signalStore, withState } from '@ngrx/signals';

export const CounterStore1 = signalStore(
  withState({ current: 0, prefValue: 1 }),

  withMethods((store) => {
    return {
      add: () =>
        patchState(store, { current: store.current() + store.prefValue() }),
      minus: () =>
        patchState(store, { current: store.current() - store.prefValue() }),
      setPrefValue: (prefValue: number) => patchState(store, { prefValue }),
    };
  }),
  withComputed((store) => {
    return {
      isDecrementDisabled: computed(
        () => store.current() - store.prefValue() < 0,
      ),
      DisplayfizzBuzzMessage: computed(() =>
        ComputeFizzBuzzMessage(store.current()),
      ),
    };
  }),
);

export function ComputeFizzBuzzMessage(valueToCheck: number) {
  const curVal = valueToCheck;
  if (curVal === 0) return '';
  if (curVal % 3 === 0 && curVal % 5 === 0) return 'FizzBuzz';
  if (curVal % 3 === 0) return 'Fizz';
  if (curVal % 5 === 0) return 'Buzz';

  return '';
}
