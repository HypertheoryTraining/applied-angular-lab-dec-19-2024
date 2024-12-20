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
import { BooksService, SortOrder, Sort } from './books.service';

type BooksStoreState = {
  sort: Sort;
};

export const BooksStore = signalStore(
  withDevtools('books'),
  withState<BooksStoreState>({
    sort: { by: 'title', order: 'asc' },
  }),
  withEntities({ collection: '_books', entity: type<BooksApiResponseItem>() }),
  withMethods((store) => {
    const booksApi = inject(BooksApi);
    return {
      updateSort: (sortRequested: Sort) => {
        console.log(sortRequested);
        patchState(store, {
          sort: {
            by: sortRequested.by,
            order: nextSortOrder(store.sort(), sortRequested.by as string),
          },
        });
      },
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
    const bookSortService = inject(BooksService);
    return {
      books: computed(() =>
        sortBooks(bookSortService, store._booksEntities(), store.sort()),
      ),
      numberOfBooks: computed(() => store._booksIds().length),
      eldestBook: computed(
        () => bookSortService.booksByYear(store._booksEntities(), 'asc')[0],
      ),
      youngestBook: computed(
        () => bookSortService.booksByYear(store._booksEntities(), 'desc')[0],
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

export function nextSortOrder(
  currentSort: Sort,
  requestedSortBy: string,
): SortOrder {
  if (currentSort.by !== requestedSortBy) {
    return 'asc';
  }
  console.log(currentSort.by);
  console.log(currentSort.order);
  console.log(requestedSortBy);
  switch (currentSort.by) {
    case 'asc':
      return 'desc';
    case 'desc':
      return 'nope';
    case 'nope':
      return 'asc';
    default:
      return 'nope';
  }
}

export function sortBooks(
  booksService: BooksService,
  books: BooksApiResponseItem[],
  sort: Sort,
): BooksApiResponseItem[] {
  if (sort.by === null || sort.order === null) {
    return books;
  }
  switch (sort.by) {
    case 'year':
      return booksService.booksByYear(books, sort.order);
    case 'author':
      return booksService.booksByAuthor(books, sort.order);
    case 'title':
      return booksService.booksByTitle(books, sort.order);
    default:
      return books;
  }
}