import { IStore } from "../../utils/models/store.model";

// Images are now full URLs from Strapi — no path transformation needed.
export const getNewsData = (state: IStore) => state.news.newsData;

export const getNewsById = (state: IStore, newsId: string) =>
  state.news.newsData.find((item) => item.id === newsId) ?? null;

export const getRecentNews = (state: IStore, count: number = 3) =>
  [...state.news.newsData]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);

export const getNewsLoader = (state: IStore) => state.news.loader;
