import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INewsArticle } from "../../utils/models/news.model";

export const fetchAsyncNewsData = createAsyncThunk(
  "news/fetchAsyncNewsData",
  async () => {
    const res: INewsArticle[] = await fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => data);
    return res;
  }
);

const initialState: {
  newsData: INewsArticle[];
  loader: boolean;
} = { newsData: [], loader: false };

const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncNewsData.pending, (state) => ({
        ...state,
        loader: true,
      }))
      .addCase(
        fetchAsyncNewsData.fulfilled,
        (state, { payload }) => ({
          ...state,
          newsData: payload,
          loader: false,
        })
      );
  },
});

export default newsSlice.reducer;
