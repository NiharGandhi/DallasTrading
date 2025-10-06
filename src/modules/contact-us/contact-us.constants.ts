import { IContactUsData } from "../../utils/models/contact-us.model";

export interface IContactUsProps {
  contactUsData: IContactUsData[];
}
export interface IContactUsStates {
  selectVal: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  answer: number | string;
  loader: boolean;
}
