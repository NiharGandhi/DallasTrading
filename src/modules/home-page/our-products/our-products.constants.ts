import { NavigateFunction, Params } from "react-router-dom";

export interface IOurProductsProps {
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
}
export interface IOurProductsStates {}
