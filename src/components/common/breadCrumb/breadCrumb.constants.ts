import { NavigateFunction, Params } from "react-router-dom";

export interface IBreadCrumbProps {
  items: {
    moduleName: string;
    link: string;
  }[];
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
}
export interface IBreadCrumbStates {
  width: number;
  isMobileWidth: boolean;
}
