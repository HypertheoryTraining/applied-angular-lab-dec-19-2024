import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BookApiResponse, BookEntity } from '../types';

export class BookApi {
  #http = inject(HttpClient);

  getBooks() {
    return this.#http.get<BookApiResponse>('/api/books');
  }

  addBook(book: Partial<BookEntity>) {
    return this.#http.post<BookEntity>('/api/books', book);
  }

  deleteBook(id: number) {
    return this.#http.delete<{ success: boolean }>(`/api/books/${id}`);
  }

  uploadImage(file: File): Promise<string> {
    return this.compressImage(file);
  }

  async compressImage(
    file: File,
    maxWidth = 400,
    maxHeight = 600,
  ): Promise<string> {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = base64;
    });

    const canvas = document.createElement('canvas');
    const ratio = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;

    canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.7);
  }
}
