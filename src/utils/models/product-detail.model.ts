export interface IProductDetailData {
  id: string;
  image: string;
  productName: string;
  Specification: {
    extraSpecTitle: string;
    extraSpec: string[];
    specification: string[];
  }[];
  detail: string[];
  company: string[];
  companyImg: string[];
  categoryName: string;
  description: Array<any>;
  detailDescription: IDetailDescription[];
  detailDescriptionAfterTable: IDetailDescription[];
  downloadFile: string;
  viewManufacturersCatalogue: string;
  downloadFiles: any;
  productDetailTableData: any;
  customerReviews: IProductDetailReviewsData[];
}

export interface IDetailDescription {
  title: string;
  content: string[];
  images1: string[];
  table: Array<any>;
  DataAfterTable: string[];
  images2: string[];
  downloadFile: string;
}

export interface IProductDetailReviewsData {
  customerName: string;
  emailId: string;
  stars: number;
  comment: string;
}
