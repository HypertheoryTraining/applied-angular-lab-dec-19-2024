import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject, resource } from '@angular/core';
import { signalStore, withMethods, withState } from '@ngrx/signals';
import { BooksApi } from './books.api';
import { BooksApiResponse } from '../types';

type BooksStoreState = {
  filter: string | null;
};

export const BooksStore = signalStore(
  withDevtools('books'),
  withState<BooksStoreState>({
    filter: null,
  }),
  withMethods((store) => {
    const booksApi = inject(BooksApi);
    return {};
  }),
);
