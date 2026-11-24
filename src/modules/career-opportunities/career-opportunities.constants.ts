import { IPageData } from "../../services/strapiService";

export interface ICareerOpportunitiesProps {
  page: IPageData | null;
  fetchAsyncPage: (slug: string) => void;
}
export interface ICareerOpportunitiesStates {}
