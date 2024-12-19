import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { addEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Book } from '../types';
import { BookApi } from './book-api';

export const BookStore = signalStore(
  withDevtools('books'),
  withEntities<Book>(),
  withMethods((store) => {
    const api = inject(BookApi);
    return {
      _getBooks: rxMethod<void>(
        pipe(
          switchMap(() =>
            api
              .getBooks()
              .pipe(tap((books) => patchState(store, addEntities(books)))),
          ),
        ),
      ),
    };
  }),
  withComputed((store) => {
    return {
      books: computed(() => store.entities()),
      numberOfBooks: computed(() => store.entities().length),
      oldestBook: computed(() =>
        store
          .entities()
          .reduce((oldest, book) => Math.min(oldest, book.year), Infinity),
      ),
      newestBook: computed(() =>
        store
          .entities()
          .reduce((newest, book) => Math.max(newest, book.year), -Infinity),
      ),
      averageNumberOfPages: computed(() => {
        const books = store.entities();
        const totalPages = books.reduce((total, book) => total + book.pages, 0);
        return books.length ? totalPages / books.length : 0;
      }),
    };
  }),
  withHooks({
    onInit(store) {
      store._getBooks();
    },
  }),
);
