import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { PrefsComponent } from './components/prefs.component';
import { ListComponent } from './components/list.component';
import { BooksStore } from './services/books.store';
import { BooksApi } from './services/books.api';
import { StatsComponent } from './components/stats.component';
import { BooksService } from './services/books.service';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    providers: [BooksStore, BooksApi, BooksService],
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
        path: 'books?sort=:sort&order=:order',
        component: ListComponent,
      },
    ],
  },
];
