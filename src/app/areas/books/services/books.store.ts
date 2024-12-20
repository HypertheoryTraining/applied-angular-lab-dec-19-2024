import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject, resource } from '@angular/core';
import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { BooksApi } from './books.api';
import { BooksApiResponseItem } from '../types';
import { addEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { sortOrder } from './books.service';

type Sort = {
  sort: string | null;
  ord: sortOrder | null;
};

type BooksStoreState = {
  sort: Sort | null;
};

export const BooksStore = signalStore(
  withDevtools('books'),
  withState<BooksStoreState>({
    sort: null,
  }),
  withEntities({ collection: '_books', entity: type<BooksApiResponseItem>() }),
  withMethods((store) => {
    const booksApi = inject(BooksApi);
    return {
      _load: rxMethod<void>(
        pipe(
          switchMap(() =>
            booksApi
              .getBooks()
              .pipe(
                tap((books) =>
                  patchState(
                    store,
                    addEntities(books, { collection: '_books' }),
                  ),
                ),
              ),
          ),
        ),
      ),
    };
  }),
  withComputed((store) => {
    return {
      books: computed(() => store._booksEntities()),
      numberOfBooks: computed(() => store._booksIds().length),
      booksByDate: computed(() => booksByDate(store._booksEntities())),
      eldestBook: computed(() => booksByDate(store._booksEntities())[0]),
      youngestBook: computed(
        () => booksByDate(store._booksEntities())[store._booksIds.length - 1],
      ),
      averagePages: computed(() => {
        const books = store._booksEntities();
        return books
          ? books.reduce((acc, book) => acc + book.pages, 0) / books.length
          : 0;
      }),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  }),
);

export function booksByDate(
  books: BooksApiResponseItem[],
): BooksApiResponseItem[] {
  return books.sort((a, b) => a.year - b.year);
}