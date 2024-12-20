import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { ListComponent } from './pages/list.component';
import { StatsComponent } from './pages/stats.component';
import { PrefsComponent } from './pages/prefs.component';
import { BooksStore } from './services/books-store';
import { BookApi } from './services/book-api';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    providers: [BooksStore, BookApi],
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      },
      {
        path: 'prefs',
        component: PrefsComponent,
      },
    ],
  },
];
