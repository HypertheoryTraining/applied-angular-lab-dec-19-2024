import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookStore } from '../services/book.store';

@Component({
  selector: 'app-book-statistics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="stats shadow flex gap-8 h-20">
      <p class="stat-title">
        There are
        <span class="stat-value">{{ store.numberOfBooks() }}</span> books
      </p>
      <p class="stat-title">
        The oldest book was published in the year
        <span class="stat-value">{{ store.oldestBook() }}</span>
      </p>
      <p class="stat-title">
        The newest book was published in the year
        <span class="stat-value">{{ store.newestBook() }}</span>
      </p>
      <p class="stat-title">
        The average number of pages in a book is
        <span class="stat-value">
          {{ store.averageNumberOfPages() }}
        </span>
      </p>
    </div>
    <a class="btn btn-primary m-auto" routerLink="../">Back to list</a>
  `,
  styles: ``,
})
export class StatisticsComponent {
  store = inject(BookStore);
}
