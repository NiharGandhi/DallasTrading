import { IStore } from "../../utils/models/store.model";
import { productsCategoryImages } from "./productsCategoryImages/productsCategoryImages";

export const getProductsCategoryData = (state: IStore) =>
  state.productsCategory.productsCategoryData.map((item) => ({
    ...item,
    image: productsCategoryImages[item.image],
  }));

export const getProductsCategoryLoader = (state: IStore) =>
  state.productsCategory.loader;
