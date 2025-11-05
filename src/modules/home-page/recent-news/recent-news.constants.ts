import { INewsArticle } from "../../../utils/models/news.model";

export interface IRecentNewsProps {
  newsData: INewsArticle[];
}

export interface IRecentNewsStates {
  currentNewsIndex: number;
  currentImageIndex: number;
  imageIndices: { [key: string]: number };
}
