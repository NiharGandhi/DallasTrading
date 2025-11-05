import { INewsArticle } from "../../utils/models/news.model";

export interface INewsDetailProps {
  allNews: INewsArticle[];
  loader: boolean;
  fetchAsyncNewsData: () => void;
  router: any;
}

export interface INewsDetailStates {
  currentImageIndex: number;
  newsId: string;
}
