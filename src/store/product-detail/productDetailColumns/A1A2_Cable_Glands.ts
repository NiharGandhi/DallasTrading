import { IProductDetailReviewsData } from "../../../utils/models/product-detail.model";
import { IColumns } from "./productDetailColumns";

export const A1A2_Cable_Glands_Table: IColumns[][] = [
  [
    {
      id: "size",
      name: "Size",
      customeWidth: 100,
      colSpan: 1,
      align: "center",
    },
    {
      id: "overallDiaBMinmm",
      name: "Overall Dia.B Min mm",
      customeWidth: 100,
      colSpan: 1,
      align: "center",
    },
    {
      id: "overallDiaBMaxmm",
      name: "Overall Dia.B Max mm",
      customeWidth: 100,
      colSpan: 1,
      align: "center",
    },
    {
      id: "isoEntryThreadDia",
      name: "ISO Entry Thread Dia",
      customeWidth: 100,
      colSpan: 1,
      align: "center",
    },
    {
      id: "isoEntryThreadLength",
      name: "ISO Entry Thread Length",
      customeWidth: 100,
      colSpan: 1,
      align: "center",
    },
    {
      id: "approxLengthFromShoulder",
      name: "Approx Length From Shoulder",
      customeWidth: 100,
      colSpan: 1,
      align: "center",
    },
    {
      id: "hexagonSizeAcrossFlat",
      name: "Hexagon Size Across Flat",
      customeWidth: 100,
      colSpan: 1,
      align: "center",
    },
    {
      id: "hexagonSizeAcrossCorners",
      name: "Hexagon Size Across Corners",
      customeWidth: 100,
      colSpan: 1,
      align: "center",
    },
  ],
];

export interface IA1A2_Cable_Glands_Model {
  id: string;
  productName: string;
  categoryName: string;
  productDetail: string;
  description: {};
  productDetailTableData: {
    size: string;
    overallDiaBMinmm: number;
    overallDiaBMaxmm: number;
    isoEntryThreadDia: number;
    isoEntryThreadLength: number;
    approxLengthFromShoulder: number;
    hexagonSizeAcrossFlat: number;
    hexagonSizeAcrossCorners: number;
  }[];
  customerReviews: IProductDetailReviewsData[];
}
