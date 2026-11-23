import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISiteSettings, getSiteSettings } from "../../services/strapiService";

export const fetchAsyncSiteSettings = createAsyncThunk(
  "siteSettings/fetchAsyncSiteSettings",
  async () => {
    const data = await getSiteSettings();
    return data;
  }
);

const initialState: {
  settings: ISiteSettings | null;
  loader: boolean;
} = { settings: null, loader: false };

const siteSettingsSlice = createSlice({
  name: "siteSettings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncSiteSettings.pending, (state) => ({
        ...state,
        loader: true,
      }))
      .addCase(fetchAsyncSiteSettings.fulfilled, (state, { payload }) => ({
        ...state,
        settings: payload,
        loader: false,
      }));
  },
});

export default siteSettingsSlice.reducer;
