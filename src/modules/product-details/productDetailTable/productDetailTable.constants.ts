import { IColumns } from "../../../store/product-detail/productDetailColumns/productDetailColumns";

export interface IProductDetailTableProps {
  productDetailTable: {
    productDetailTableData: any;
    productDetailTableColumns: IColumns[][];
  };
}
export interface IProductDetailTableStates {}
