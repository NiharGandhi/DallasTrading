import { IStore } from "../../utils/models/store.model";
import { productsImages } from "../products/productsImages/productsImages";

export const getSearchResultsFilterData = (state: IStore) =>
  state.searchResults.searchResultsFilterData.map((data) => ({
    ...data,
    image: productsImages[data.image],
  }));

export const getSearchResultsLoader = (state: IStore) =>
  state.searchResults.loader;

export const getSearchValue = (state: IStore) => state.searchResults.searchVal;
