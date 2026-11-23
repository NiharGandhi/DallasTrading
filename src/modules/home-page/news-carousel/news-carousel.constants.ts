import { INewsArticle } from "../../../utils/models/news.model";

export interface INewsCarouselProps {
  newsData: INewsArticle[];
  loader: boolean;
  fetchAsyncNewsData: () => void;
}
export interface INewsCarouselStates {
  currentSlide: number;
  waitAgain: boolean;
}
