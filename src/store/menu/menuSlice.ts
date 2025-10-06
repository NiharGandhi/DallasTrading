import { createSlice } from "@reduxjs/toolkit";
import { IMenuItems } from "../../utils/models/menu.model";

const initialState: { menuItems: IMenuItems[] } = {
  menuItems: [
    {
      id: 0,
      name: "Home",
      path: "./home",
    },
    {
      id: 1,
      name: "About Us",
      path: "./about",
    },
    {
      id: 2,
      name: "Management",
      path: "./management",
    },
    {
      id: 3,
      name: "Certificates",
      path: "./certificates",
    },
    {
      id: 4,
      name: "Products",
      path: "./our-products",
    },
    {
      id: 5,
      name: "Projects",
      path: "./our-projects",
    },
    {
      id: 6,
      name: "Career Opportunities",
      path: "./career-opportunities",
    },
    {
      id: 7,
      name: "Contact Us",
      path: "./contact-us",
    },
  ],
};

const menuSlice = createSlice({
  name: "menu",
  initialState: initialState,
  reducers: {},
});

export default menuSlice.reducer;
