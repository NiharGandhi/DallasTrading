import { IPageData } from "../../services/strapiService";

export interface IAboutPageProps {
  page: IPageData | null;
  fetchAsyncPage: (slug: string) => void;
}
export interface IAboutPageStates {}
