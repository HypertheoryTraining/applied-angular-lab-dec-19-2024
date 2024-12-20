import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { PrefsComponent } from './components/prefs.component';
import { ListComponent } from './components/list.component';
import { BooksStore } from './services/books.store';
import { BooksApi } from './services/books.api';
import { StatsComponent } from './components/stats.component';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    providers: [BooksStore, BooksApi],
    component: BooksComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'prefs',
        component: PrefsComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      },
      {
        path: 'books?sort=:sort&ord=:ord',
        component: ListComponent,
      },
    ],
  },
];
