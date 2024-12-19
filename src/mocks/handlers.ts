import news from './news-handler';
import { features } from './features-handler';
import { lrcHandlers } from './lrc-handler';
import { booksHandlers } from './books-handler';
export const handlers = [
  ...news,
  ...features,
  ...lrcHandlers,
  ...booksHandlers,
];
