import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IProductDetailData,
  IProductDetailReviewsData,
} from "../../utils/models/product-detail.model";
import { getProductDetail } from "../../services/strapiService";

export const fetchAsyncProductDetailData = createAsyncThunk(
  "productDetail/fetchAsyncProductDetailData",
  async (productId: string) => {
    const detail = await getProductDetail(productId);
    if (!detail) {
      throw new Error(`Product not found: ${productId}`);
    }
    return detail;
  }
);

const initialState: {
  productDetailData: IProductDetailData;
  loader: boolean;
  loadReviews: boolean;
} = {
  productDetailData: {
    id: "",
    image: "",
    productName: "",
    Specification: [],
    detail: [],
    company: [],
    companyImg: [],
    categoryName: "",
    description: [],
    detailDescription: [],
    productDetailTableData: [],
    customerReviews: [],
    downloadFile: "",
    detailDescriptionAfterTable: [],
    viewManufacturersCatalogue: "",
    downloadFiles: {},
  },
  loader: false,
  loadReviews: false,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: initialState,
  reducers: {
    addComment: (
      state,
      { payload }: { payload: IProductDetailReviewsData }
    ) => {
      return {
        ...state,
        productDetailData: {
          ...state.productDetailData,
          customerReviews: [
            payload,
            ...state.productDetailData.customerReviews,
          ],
        },
        loadReviews: false,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncProductDetailData.pending, (state) => {
        return { ...state, loader: true };
      })
      .addCase(fetchAsyncProductDetailData.fulfilled, (state, { payload }) => {
        return { ...state, productDetailData: payload, loader: false };
      });
  },
});

export const { addComment } = productDetailSlice.actions;
export default productDetailSlice.reducer;
