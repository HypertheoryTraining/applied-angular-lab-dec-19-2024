import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export const CounterStore = signalStore(
  withState({ current: 42 }),

  withMethods((store) => {
    return {
      add: () => patchState(store, { current: store.current() + 1 }),
      minus: () => patchState(store, { current: store.current() - 1 }),
    };
  }),
);
