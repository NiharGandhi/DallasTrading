import { NavigateFunction, Params } from "react-router-dom";
import { IProductsCategoryData } from "../../../utils/models/productsCategory.model";

export interface IDisplayProductCategoriesProps {
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
  productsCategoryData: IProductsCategoryData[];
}
export interface IDisplayProductCategoriesStates {}
