import { Routes } from '@angular/router';
import { ListComponent } from './pages/list.component';
import { StatisticsComponent } from './pages/statistics.component';
import { BookApi } from './services/book-api';
import { BookStore } from './services/book.store';
import { BookComponent } from './book.component';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    providers: [BookStore, BookApi],
    component: BookComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'stats',
        component: StatisticsComponent,
      },
    ],
  },
];
