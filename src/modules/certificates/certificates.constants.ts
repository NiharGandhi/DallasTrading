import { IPageData } from "../../services/strapiService";

export interface ICertificatesProps {
  page: IPageData | null;
  fetchAsyncPage: (slug: string) => void;
}
export interface ICertificatesStates {}
