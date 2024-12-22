import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  addEntities,
  removeEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { BookApi } from './book-api';
import { BookEntity } from '../types';

export const COLUMN_PREFS = ['id', 'title', 'author', 'year'] as const;
export type ColumnPrefs = (typeof COLUMN_PREFS)[number];

type PrefsState = {
  column: keyof BookEntity;
  ascending: boolean;
  id: number;
};

export const BooksStore = signalStore(
  withState<PrefsState>({ column: 'id', ascending: true, id: 0 }),
  withStorageSync('books-prefs'),
  withEntities({ collection: '_server', entity: type<BookEntity>() }),
  withMethods((store) => {
    const api = inject(BookApi);
    return {
      setColumnPref: (column: ColumnPrefs) => patchState(store, { column }),
      setBookId: (id: number) => patchState(store, { id }),
      setDirection: (direction: boolean) =>
        patchState(store, { ascending: direction }),
      _load: rxMethod<void>(
        pipe(
          switchMap(() =>
            api
              .getBooks()
              .pipe(
                tap((books) =>
                  patchState(
                    store,
                    addEntities(books.data, { collection: '_server' }),
                  ),
                ),
              ),
          ),
        ),
      ),
      addBook: rxMethod<Partial<BookEntity>>(
        pipe(
          switchMap((book) =>
            api
              .addBook(book)
              .pipe(
                tap((newBook) =>
                  patchState(
                    store,
                    addEntities([newBook], { collection: '_server' }),
                  ),
                ),
              ),
          ),
        ),
      ),
      deleteBook: rxMethod<number>(
        pipe(
          switchMap((id) =>
            api.deleteBook(id).pipe(
              tap(() => {
                patchState(
                  store,
                  removeEntities([id], { collection: '_server' }),
                );
              }),
            ),
          ),
        ),
      ),
    };
  }),
  withComputed((store) => {
    return {
      columnPrefs: computed(() => COLUMN_PREFS),
      books: computed(() => {
        const server = store._serverEntities().map(
          (b) =>
            ({ ...b, pending: false }) as BookEntity & {
              pending: boolean;
            },
        );

        return server.sort((a, b) => {
          const column = store.column();
          if (column === 'id' || column === 'year') {
            return store.ascending()
              ? Number(a[column]) - Number(b[column])
              : Number(b[column]) - Number(a[column]);
          }

          const aVal = a[column] ?? '';
          const bVal = b[column] ?? '';

          if (store.ascending()) {
            return aVal > bVal ? 1 : -1;
          } else {
            return aVal < bVal ? 1 : -1;
          }
        });
      }),
      selectedBook: computed(() => {
        return store._serverEntities().find((b) => b.id === store.id());
      }),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  }),
);
