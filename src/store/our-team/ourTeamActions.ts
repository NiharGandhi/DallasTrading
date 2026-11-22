import { IStore } from "../../utils/models/store.model";

// Photos are now full URLs from Strapi — no local image map lookup needed.
export const getOurTeamDetailsData = (state: IStore) =>
  state.ourTeam.ourTeamDetailData;

export const getOurTeamDetailsLoader = (state: IStore) =>
  state.ourTeam.loader;
