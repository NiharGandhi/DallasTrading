import { IPartner } from "../../../services/strapiService";

export interface IOurPartnersProps {
  isSidePaddingNeeded?: boolean;
  partnersData: IPartner[];
  loader: boolean;
  fetchAsyncPartnersData: () => void;
}
export interface IOurPartnersStates {
  isMobileWidth: boolean;
  isDesktopWidth: boolean;
}
