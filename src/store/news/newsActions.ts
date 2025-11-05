import { IStore } from "../../utils/models/store.model";

export const getNewsData = (state: IStore) =>
  state.news.newsData.map((news) => ({
    ...news,
    images: news.images.map((img) => `/news/${news.id}/${img}`),
    mainImage: `/news/${news.id}/${news.mainImage}`,
  }));

export const getNewsById = (state: IStore, newsId: string) => {
  const news = state.news.newsData.find((item) => item.id === newsId);
  if (!news) return null;
  return {
    ...news,
    images: news.images.map((img) => `/news/${news.id}/${img}`),
    mainImage: `/news/${news.id}/${news.mainImage}`,
  };
};

export const getRecentNews = (state: IStore, count: number = 3) => {
  const sortedNews = [...state.news.newsData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return sortedNews.slice(0, count).map((news) => ({
    ...news,
    images: news.images.map((img) => `/news/${news.id}/${img}`),
    mainImage: `/news/${news.id}/${news.mainImage}`,
  }));
};

export const getNewsLoader = (state: IStore) => state.news.loader;
