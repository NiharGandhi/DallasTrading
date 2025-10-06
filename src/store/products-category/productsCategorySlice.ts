import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProductsCategoryData } from "../../utils/models/productsCategory.model";

export const fetchAsyncProductsCategoryData = createAsyncThunk(
  "productsCategory/fetchAsyncProductsCategoryData",
  async () => {
    let response: IProductsCategoryData[] = await fetch(
      "/data/products-category.json"
    )
      .then((data) => data.json())
      .then((data: IProductsCategoryData[]) => data);
    return response;
  }
);

const initialState: {
  productsCategoryData: IProductsCategoryData[];
  loader: boolean;
} = {
  productsCategoryData: [],
  loader: false,
};

const productsCategorySlice = createSlice({
  name: "productsCategory",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncProductsCategoryData.pending, (state) => {
        return { ...state, loader: true };
      })
      .addCase(
        fetchAsyncProductsCategoryData.fulfilled,
        (state, { payload }) => {
          return { ...state, productsCategoryData: payload, loader: false };
        }
      );
  },
});

export default productsCategorySlice.reducer;
