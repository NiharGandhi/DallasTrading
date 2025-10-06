import { IOurTeamDetails } from "../../utils/models/our-team.model";

export interface IOurTeamProps {
  fetchAsyncOurTeamDetailsData: any;
  ourTeamDetailsData: IOurTeamDetails[];
  loader: boolean;
}
export interface IOurTeamStates {}
