import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksStore } from '../services/books-store';
import { BookEntity } from '../types';
import { BookApi } from '../services/book-api';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex justify-center mt-4">
      <div class="card w-96 bg-base-200 shadow-xl">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <h2 class="card-title">Add New Book</h2>
            <button
              class="btn btn-secondary btn-sm btn-outline"
              (click)="populateRandom()"
            >
              Random
            </button>
          </div>
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
            <div class="form-control">
              <label class="label" for="pages">
                <span class="label-text">Pages</span>
              </label>
              <input
                id="pages"
                type="number"
                formControlName="pages"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label" for="language">
                <span class="label-text">Language</span>
              </label>
              <input
                id="language"
                type="text"
                formControlName="language"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label" for="country">
                <span class="label-text">Country</span>
              </label>
              <input
                id="country"
                type="text"
                formControlName="country"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label" for="cover">
                <span class="label-text">Book Cover</span>
              </label>
              <input
                type="file"
                id="cover"
                accept="image/*"
                class="file-input file-input-bordered w-full"
                (change)="onFileSelected($event)"
              />
            </div>
            @if (imagePreview()) {
              <div class="mt-4">
                <img
                  [src]="imagePreview()"
                  class="w-32 h-48 object-cover rounded-lg"
                  alt=""
                />
              </div>
            }
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
  private api = inject(BookApi);
  imagePreview = signal<string | null>(null);
  selectedFile: File | null = null;
  private fb = inject(FormBuilder);
  private store = inject(BooksStore);
  private router = inject(Router);

  form = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    year: [0, Validators.required],
    pages: [0],
    language: [''],
    country: [''],
  });

  async submit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const newBook: Partial<BookEntity> = {
        title: formData.title ?? '',
        author: formData.author ?? '',
        year: Number(formData.year) || 0,
        imageLink: this.imagePreview() ?? 'images/fizzbuzz.gif',
        pages: Number(formData.pages) || undefined,
        language: formData.language || undefined,
        country: formData.country || undefined,
      };
      this.store.addBook(newBook);
      this.router.navigate(['/books']);
    }
  }

  async onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      this.imagePreview.set(await this.api.uploadImage(file));
    }
  }
  populateRandom() {
    const books = this.store.books();
    if (books.length > 0) {
      const randomIndex = Math.floor(Math.random() * books.length);
      const randomBook = books[randomIndex];

      this.form.patchValue({
        title: randomBook.title,
        author: randomBook.author,
        year: randomBook.year,
        pages: randomBook.pages,
        language: randomBook.language,
        country: randomBook.country,
      });

      //   if (randomBook.imageLink) {
      //     this.imagePreview.set(randomBook.imageLink);
      //   }
    }
  }
}
