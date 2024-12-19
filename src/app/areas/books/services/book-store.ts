import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
export const BY_VALUES = ['id', 'author', 'title', 'year'] as const;
type ByValues = (typeof BY_VALUES)[number];

type BooksState = {
  current: string;
  by: ByValues;
};
export const BooksStore = signalStore(
  withState<BooksState>({ current: 'id', by: 'id' }),
  withMethods((store) => {
    return {
      setBy: (by: ByValues) => patchState(store, { by }),
    };
  }),
  withComputed((store) => {
    return {
      byValues: computed(() => BY_VALUES),
    };
  }),
);
