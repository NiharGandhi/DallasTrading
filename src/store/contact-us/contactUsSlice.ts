import { createSlice } from "@reduxjs/toolkit";
import { IContactUsData } from "../../utils/models/contact-us.model";
import { IStore } from "../../utils/models/store.model";

const initialState: { contactUsData: IContactUsData[]; loader: boolean } = {
  contactUsData: [
    {
      name: "Dubai - United Arab Emirates",
      address: "Dubai Industrial City Phase 1, J Block, Warehouse No. 08, P.O. Box 2028, Dubai, United Arab Emirates.",
      mobileNo: "+971 4 363 5500",
      fax: "+971 4 429 0088",
      email: "info@dallastrading.net",
      location:
        "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3620.105210625898!2d55.06092531500273!3d24.860255984054014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDUxJzM2LjkiTiA1NcKwMDMnNDcuMiJF!5e0!3m2!1sen!2sae!4v1690217954086!5m2!1sen!2sae",
    },
    {
      name: "Muscat - Sultanate of Oman",
      address: "PC 111, Ghala Industrial Area, Muscat, Sultanate of Oman",
      mobileNo: "+968 2 459 3041",
      email: "vijay@dallastrading.net",
      location:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14627.436410419681!2d58.34767921107112!3d23.57350333324495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91ffd75ae2f525%3A0xba7e54290d8f6b76!2sGhala%20Industrial%20Area!5e0!3m2!1sen!2sin!4v1687796554275!5m2!1sen!2sin",
    },
    {
      name: "Hidd - Kingdom of Bahrain",
      address: "Majaal 4, Bldg 1988, Unit 13, Road 1527, Block 115, BIW, Hidd Industrial Area, Kingdom of Bahrain",
      mobileNo: "+973 1770 2277",
      email: "info@dallastrading.net",
      location:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.5647892982376!2d50.65827831502199!3d26.233617683416664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49b8f3c8f8f8f1%3A0x1c8f8f8f8f8f8f8!2sHidd%20Industrial%20Area%2C%20Bahrain!5e0!3m2!1sen!2sin!4v1690217954086!5m2!1sen!2sae",
    },
    {
      name: "Khobar - Kingdom of Saudi Arabia",
      address: "Office - G1, Balghonaim Business center, Albandariya, Khobar, 34423 Saudi Arabia.",
      mobileNo: "+966 50 216 1756",
      email: "connect@pesgulf.com",
      location:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.540307099004!2d50.21013868363719!3d26.30899842651879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49e850b45d6c4d%3A0x23d6bfd422117c93!2z2YXYsdmD2LIg2KjYp9mE2LrZhtmK2YUg2YTZhNij2LnZhdin2YQgQmFsZ2hvbmFpbSBidXNpbmVzcyBjZW50ZXI!5e0!3m2!1sen!2sae!4v1762784850551!5m2!1sen!2sae",
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
