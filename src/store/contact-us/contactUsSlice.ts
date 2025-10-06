import { createSlice } from "@reduxjs/toolkit";
import { IContactUsData } from "../../utils/models/contact-us.model";
import { IStore } from "../../utils/models/store.model";

const initialState: { contactUsData: IContactUsData[]; loader: boolean } = {
  contactUsData: [
    {
      name: "Dubai",
      address: "DUBAI INDUSTRIAL CITY, PHASE 1 , BLOCK J-08, P.O.BOX 2028",
      mobileNo: "+971 4 3635500",
      fax: "+971 4 4290088",
      email: "info@dallastrading.net",
      location:
        "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3620.105210625898!2d55.06092531500273!3d24.860255984054014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDUxJzM2LjkiTiA1NcKwMDMnNDcuMiJF!5e0!3m2!1sen!2sae!4v1690217954086!5m2!1sen!2sae",
    },
    {
      name: "Qatar (Doha Office)",
      address: "Street 32, Gate 98, Industrial Area, Doha, State of Qatar",
      mobileNo: "+974 4 469 1947",
      email: "dallastrading@qatar.net.qa",
      location:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.3678028789977!2d51.44411157601849!3d25.190816031957947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45d1246575f249%3A0x10f24869b5f2f639!2s98%20Street%2032%2C%20Ar-Rayyan%2C%20Qatar!5e0!3m2!1sen!2sin!4v1687796292898!5m2!1sen!2sin",
    },
    {
      name: "Qatar (Doha Showroom)",
      address: "Building no 3, shop no 16 Barwa Village Doha, State of Qatar",
      mobileNo: "+974 4 442 6811",
      email: "dallastrading@qatar.net.qa",
      location:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14439.86168891986!2d51.57103461390279!3d25.20438855818201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45cebdfbd5c125%3A0x388db881b4786d9c!2sBarwa%20Village%2C%20Doha%2C%20Qatar!5e0!3m2!1sen!2sin!4v1687796449704!5m2!1sen!2sin",
    },
    {
      name: "Oman (Muscat Office)",
      address: "PC 111, Ghala Industrial Area, Muscat, Sultanate of Oman",
      mobileNo: "+968 2 459 3041",
      email: "vijay@dallastrading.net",
      location:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14627.436410419681!2d58.34767921107112!3d23.57350333324495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91ffd75ae2f525%3A0xba7e54290d8f6b76!2sGhala%20Industrial%20Area!5e0!3m2!1sen!2sin!4v1687796554275!5m2!1sen!2sin",
    },
  ],
  loader: false,
};

const contactUsSlice = createSlice({
  name: "contactUs",
  initialState: initialState,
  reducers: {},
});

export const getContactUsData = (state: IStore) =>
  state.contactUs.contactUsData;

export default contactUsSlice.reducer;
