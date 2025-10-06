import { NavigateFunction, Params } from "react-router-dom";
import { IProductsData } from "../../../utils/models/products.model";

export interface IDisplayProductsProps {
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
  productsData: IProductsData[];
  setNoOfItems: (noOfItems: number) => void;
}
export interface IDisplayProductsStates {}
