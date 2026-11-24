import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPageData, getPage } from "../../services/strapiService";

export const fetchAsyncPage = createAsyncThunk(
  "pages/fetchAsyncPage",
  async (slug: string) => {
    const page = await getPage(slug);
    return { slug, page };
  }
);

const initialState: {
  pages: { [slug: string]: IPageData };
  loading: { [slug: string]: boolean };
} = { pages: {}, loading: {} };

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncPage.pending, (state, { meta }) => ({
        ...state,
        loading: { ...state.loading, [meta.arg]: true },
      }))
      .addCase(fetchAsyncPage.fulfilled, (state, { payload }) => ({
        ...state,
        loading: { ...state.loading, [payload.slug]: false },
        pages: payload.page
          ? { ...state.pages, [payload.slug]: payload.page }
          : state.pages,
      }));
  },
});

export default pagesSlice.reducer;
