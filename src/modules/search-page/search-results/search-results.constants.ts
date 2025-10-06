import { NavigateFunction, Params } from "react-router-dom";
import { ISearchResultsData } from "../../../utils/models/search-results.model";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

export interface ISearchResultsProps {
  data: ISearchResultsData[];
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
  setSearchResultsDataToInitial: ActionCreatorWithoutPayload<"searchResults/setSearchResultsDataToInitial">;
}
export interface ISearchResultsStates {}
