import { IStore } from "../../utils/models/store.model";
import { ourTeamImages } from "./ourTeamImages/ourTeamImages";

export const getOurTeamDetailsData = (state: IStore) =>
  state.ourTeam.ourTeamDetailData.map((person) => ({
    ...person,
    image: ourTeamImages[person.image],
  }));

export const getOurTeamDetailsLoader = (state: IStore) => state.ourTeam.loader;
