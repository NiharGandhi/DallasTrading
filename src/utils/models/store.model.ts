import { IContactUsData } from "./contact-us.model";
import { IMenuItems } from "./menu.model";
import { IOurTeamDetails } from "./our-team.model";
import { IProductDetailData } from "./product-detail.model";
import { IProductsData } from "./products.model";
import { IProductsCategoryData } from "./productsCategory.model";
import { ISearchResultsData } from "./search-results.model";

export interface IStore {
  menu: {
    menuItems: IMenuItems[];
  };
  productDetail: {
    productDetailData: IProductDetailData;
    loader: boolean;
    loadReviews: boolean;
  };
  ourTeam: {
    ourTeamDetailData: IOurTeamDetails[];
    loader: boolean;
  };
  productsCategory: {
    productsCategoryData: IProductsCategoryData[];
    loader: boolean;
  };
  products: {
    productsData: IProductsData[];
    productCategory: string;
    loader: boolean;
  };
  searchResults: {
    searchResultsData: ISearchResultsData[];
    searchResultsFilterData: ISearchResultsData[];
    loader: boolean;
    searchVal: string;
  };
  contactUs: {
    contactUsData: IContactUsData[];
    loader: boolean;
  };
}
