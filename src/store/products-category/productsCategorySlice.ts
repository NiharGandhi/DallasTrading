import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProductsCategoryData } from "../../utils/models/productsCategory.model";
import { getProductCategories } from "../../services/strapiService";

export const fetchAsyncProductsCategoryData = createAsyncThunk(
  "productsCategory/fetchAsyncProductsCategoryData",
  async () => {
    const response: IProductsCategoryData[] = await getProductCategories();
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
