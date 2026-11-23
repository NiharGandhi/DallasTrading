import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { NavigateFunction, Params } from "react-router-dom";
import { ISearchResultsData } from "../../utils/models/search-results.model";
import { ISiteSettings } from "../../services/strapiService";

export interface IHeaderProps {
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
  handleSearchValueChange: ActionCreatorWithPayload<
    string,
    "searchResults/handleSearchValueChange"
  >;
  setSearchResultsDataToInitial: ActionCreatorWithoutPayload<"searchResults/setSearchResultsDataToInitial">;
  fetchAsyncSearchResultsData: () => void;
  searchVal: string;
  searchResults: ISearchResultsData[];
  searchLoader: boolean;
  settings: ISiteSettings | null;
}
export interface IHeaderStates {
  width: number;
  isMobileWidth: boolean;
  isLargeDevice: boolean;
  openMenu: boolean;
  openSearchModal: boolean;
  isCopied: boolean;
}
