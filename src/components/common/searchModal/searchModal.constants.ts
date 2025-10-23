import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { NavigateFunction, Params } from "react-router-dom";
import { ISearchResultsData } from "../../../utils/models/search-results.model";

export interface ISearchModalProps {
  open: boolean;
  onClose: () => void;
  searchVal: string;
  searchResults: ISearchResultsData[];
  loader: boolean;
  handleSearchValueChange: ActionCreatorWithPayload<
    string,
    "searchResults/handleSearchValueChange"
  >;
  setSearchResultsDataToInitial: ActionCreatorWithoutPayload<"searchResults/setSearchResultsDataToInitial">;
  fetchAsyncSearchResultsData: () => void;
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
}

export interface ISearchModalStates {}

