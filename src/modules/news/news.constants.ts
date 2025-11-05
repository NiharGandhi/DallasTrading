export interface INewsProps {}
export interface INewsStates {}

export interface INewsItem {
  id: number;
  reference: string;
  title: string;
  date: string;
  location: string;
  content: string[];
  images: string[];
  hashtags: string[];
}
