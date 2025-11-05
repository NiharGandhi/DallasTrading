import { INewsArticle } from "../../utils/models/news.model";

export interface INewsProps {
  newsData: INewsArticle[];
  fetchAsyncNewsData: () => void;
}

export interface INewsStates {}
