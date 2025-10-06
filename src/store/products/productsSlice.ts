import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProductsData } from "../../utils/models/products.model";

export const fetchAsyncProductsData = createAsyncThunk(
  "products/fetchAsyncProductsData",
  async (payload: { productCategoryId: string; productCategory: string }) => {
    let response: IProductsData[] = await fetch("/data/products.json")
      .then((data) => data.json())
      .then((data: IProductsData[]) =>
        data.filter(
          (item) => item.productCategoryId === payload.productCategoryId
        )
      );
    return { data: response, productCategory: payload.productCategory };
  }
);

const initialState: {
  productsData: IProductsData[];
  productCategory: string;
  loader: boolean;
} = {
  productsData: [],
  productCategory: "",
  loader: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncProductsData.pending, (state) => {
        return { ...state, loader: true };
      })
      .addCase(fetchAsyncProductsData.fulfilled, (state, { payload }) => {
        return {
          ...state,
          productsData: payload.data,
          loader: false,
          productCategory: payload.data.length
            ? payload.data[0].productCategory
            : payload.productCategory
                .split("_")
                .map((word) => {
                  const first = word.charAt(0).toUpperCase();
                  const second = word.slice(1);
                  return first + second;
                })
                .join(" "),
        };
      });
  },
});

export default productsSlice.reducer;
