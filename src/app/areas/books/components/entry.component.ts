import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksStore } from '../services/books-store';
import { BookEntity } from '../types';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex justify-center mt-4">
      <div class="card w-96 bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Add New Book</h2>
          <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="form-control">
              <label class="label" for="title">
                <span class="label-text">Title</span>
              </label>
              <input
                id="title"
                type="text"
                formControlName="title"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label" for="author">
                <span class="label-text">Author</span>
              </label>
              <input
                id="author"
                type="text"
                formControlName="author"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label" for="year">
                <span class="label-text">Year</span>
              </label>
              <input
                id="year"
                type="number"
                formControlName="year"
                class="input input-bordered"
              />
            </div>
            <div class="form-control mt-6">
              <button
                type="submit"
                class="btn btn-primary"
                [disabled]="!form.valid"
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class EntryComponent {
  private fb = inject(FormBuilder);
  private store = inject(BooksStore);
  private router = inject(Router);

  form = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    year: ['', Validators.required],
  });

  submit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const newBook: Partial<BookEntity> = {
        title: formData.title ?? '',
        author: formData.author ?? '',
        year: Number(formData.year) || 0,
      };
      this.store.addBook(newBook);
      this.router.navigate(['/books']);
    }
  }
}
