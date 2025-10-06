import { NavigateFunction, Params } from "react-router-dom";

export interface IProductListProps {
  loader: boolean;
  fetchAsyncProductsData: any;
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
  productCategoryName: string;
}
export interface IProductListStates {
  selectVal: number;
  noOfItems: number;
}
