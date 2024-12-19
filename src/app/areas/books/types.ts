export type BooksApiResponseItem = {
  id: string;
  author: string;
  title: string;
  year: number;
  pages: number;
  country: string;
  language: string;
  imageLink: string;
  link: string;
};
export type BooksApiResponse = BooksApiResponseItem[];
