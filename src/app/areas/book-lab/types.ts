export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  pages: number;
};

export type BookApiResponse = Book[];
