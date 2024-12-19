import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { ListComponent, StatsComponent, PrefsComponent } from './pages';
import { BooksStore } from './services/book-store';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    providers: [BooksStore],
    component: BooksComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
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
