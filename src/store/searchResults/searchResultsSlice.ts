import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISearchResultsData } from "../../utils/models/search-results.model";
import { getAllProducts } from "../../services/strapiService";

export const fetchAsyncSearchResultsData = createAsyncThunk(
  "searchResults/fetchAsyncSearchResultsData",
  async () => {
    const products = await getAllProducts();
    // ISearchResultsData is a subset of IProductsData — same shape
    const response: ISearchResultsData[] = products.map((p) => ({
      id: p.id,
      productCategoryId: p.productCategoryId,
      productCategory: p.productCategory,
      title: p.title,
      image: p.image,
      company: p.company,
    }));
    return response;
  }
);

const initialState: {
  searchResultsData: ISearchResultsData[];
  searchResultsFilterData: ISearchResultsData[];
  loader: boolean;
  searchVal: string;
} = {
  searchResultsData: [],
  searchResultsFilterData: [],
  loader: false,
  searchVal: "",
};

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: initialState,
  reducers: {
    handleSearchValueChange: (state, { payload }) => {
      return {
        ...state,
        searchVal: payload,
        searchResultsFilterData: state.searchResultsData.filter(
          (item) =>
            item.title.toLowerCase().includes(payload.toLowerCase()) ||
            item.productCategory
              .toLowerCase()
              .includes(payload.toLowerCase()) ||
            item.company.toLowerCase().includes(payload.toLowerCase())
        ),
      };
    },
    setSearchResultsDataToInitial: (state) => {
      return { ...state, searchResultsFilterData: [], searchVal: "" };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncSearchResultsData.pending, (state) => ({
        ...state,
        loader: true,
      }))
      .addCase(fetchAsyncSearchResultsData.fulfilled, (state, { payload }) => ({
        ...state,
        searchResultsData: payload,
        loader: false,
      }));
  },
});

export const { handleSearchValueChange, setSearchResultsDataToInitial } =
  searchResultsSlice.actions;

export default searchResultsSlice.reducer;
