import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISearchResultsData } from "../../utils/models/search-results.model";

export const fetchAsyncSearchResultsData = createAsyncThunk(
  "searchResults/fetchAsyncSearchResultsData",
  async () => {
    let response: ISearchResultsData[] = await fetch("/data/searchResults.json")
      .then((res) => res.json())
      .then((data) => data);
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
