export interface IDetailsProps {
  details: {
    productId: string;
    productName: string;
    detail: string[];
    Specification: {
      extraSpecTitle: string;
      extraSpec: string[];
      specification: string[];
    }[];
    company: string[];
    companyImg: string[];
    productCategory: string;
    productImage: string;
    description: any[];
    downloadFile: string;
    downloadFiles: any;
    viewManufacturersCatalogue: string;
  };
}
export interface IDetailsStates {}
