import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  OnInit,
  computed,
} from '@angular/core';
import { BooksStore } from '../services/books-store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="flex justify-center items-center my-6 ">
      <div class="card card-side bg-base-200 shadow-xl w-8/12">
        <figure>
          <img [src]="book()?.imageLink" alt="Book Cover" />
        </figure>
        <div class="card-body">
          <div class="mt-4 mb-8">
            <h2 class="card-title underline decoration-1">
              <a class="" [href]="book()?.link">{{ book()?.title }}</a>
            </h2>
            <p>{{ book()?.author }}</p>
          </div>

          <p class="font-medium">Country: {{ book()?.country }}</p>
          <p class="font-medium">Language: {{ book()?.language }}</p>
          <p class="font-medium">Page count: {{ book()?.pages }}</p>
          <p class="font-medium">Year: {{ book()?.year }}</p>

          <div class="card-actions justify-between">
            <a class="btn btn-accent btn-outline" routerLink="../../"
              >⇠ Back to List</a
            >
            @if (linkActive()) {
              <a class="btn btn-primary btn-outline" [href]="book()?.link"
                >Wiki</a
              >
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class DetailsComponent implements OnInit {
  store = inject(BooksStore);
  id = input.required<number>();

  ngOnInit() {
    this.store.setBookId(this.id());
  }

  book = this.store.selectedBook;
  linkActive = computed(() => this.book()?.link.includes('http'));
}
