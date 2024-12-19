import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { PrefsComponent } from './components/prefs.component';
import { ListComponent } from './components/list.component';
import { BooksStore } from './services/books.store';
import { BooksApi } from './services/books.api';
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
    ],
  },
];
