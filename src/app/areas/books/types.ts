export type BookEntity = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: number;
  custom?: boolean | false;
  imageData?: string; // base64 maybe ? ¯\_(ツ)_/¯ we'll see
};

export type BookApiResponse = {
  data: BookEntity[];
};
