import { ISearchResultsData } from "../../utils/models/search-results.model";

export interface ISearchPageProps {
  loader: boolean;
  fetchAsyncSearchResultsData: any;
  data: ISearchResultsData[];
}
export interface ISearchPageStates {
  selectVal: number;
}
