import { IStore } from "../../utils/models/store.model";
import { ourCompaniesImages } from "../our-companies/ourCompaniesImages/ourCompaniesImages";
import { productsImages } from "../products/productsImages/productsImages";
import { productDetailColumns } from "./productDetailColumns/productDetailColumns";
import { productDetailImages } from "./productDetailImages/productDetailImages";

export const getProductDetailLoader = (state: IStore) =>
  state.productDetail.loader;

export const getProductDetails = (state: IStore) => {    
  return {
    productId: state.productDetail.productDetailData.id,
    productName: state.productDetail.productDetailData.productName,
    detail: state.productDetail.productDetailData.detail,
    Specification: state.productDetail.productDetailData.Specification,
    company: state.productDetail.productDetailData.company,
    companyImg: state.productDetail.productDetailData.company.map(
      (comp) => ourCompaniesImages[comp]
    ),
    productCategory: state.productDetail.productDetailData.categoryName,
    productImage: productsImages[state.productDetail.productDetailData.image],
    description: state.productDetail.productDetailData.description,
    downloadFile: state.productDetail.productDetailData.downloadFile,
    downloadFiles: state.productDetail.productDetailData.downloadFiles,
    viewManufacturersCatalogue:
      state.productDetail.productDetailData.viewManufacturersCatalogue,
  };
};

export const getProductDetailName = (state: IStore) => ({
  productName: state.productDetail.productDetailData.productName,
  productCategoryName: state.productDetail.productDetailData.categoryName,
});

export const getProductDetailTableData = (state: IStore) => ({
  productDetailTableData:
    state.productDetail.productDetailData.productDetailTableData,
  productDetailTableColumns:
    productDetailColumns[state.productDetail.productDetailData.id],
});

export const getProductDetailDescription = (state: IStore) =>
  state.productDetail.productDetailData.detailDescription.map((item) => ({
    ...item,
    images1: item?.images1?.map((img) => productDetailImages[img]),
    images2: item?.images2?.map((img) => productDetailImages[img]),
  }));

export const getProductDetailDescriptionAfterTable = (state: IStore) =>
  state.productDetail.productDetailData.detailDescriptionAfterTable.map((item) => ({
    ...item,
    images1: item?.images1?.map((img) => productDetailImages[img]),
    images2: item?.images2?.map((img) => productDetailImages[img]),
  }));

export const getProductDetailReviews = (state: IStore) =>
  state.productDetail.productDetailData.customerReviews;
