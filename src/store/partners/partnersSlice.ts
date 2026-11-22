import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPartner, getPartners } from "../../services/strapiService";

export const fetchAsyncPartnersData = createAsyncThunk(
  "partners/fetchAsyncPartnersData",
  async () => {
    return await getPartners();
  }
);

const initialState: {
  partnersData: IPartner[];
  loader: boolean;
} = { partnersData: [], loader: false };

const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncPartnersData.pending, (state) => ({
        ...state,
        loader: true,
      }))
      .addCase(fetchAsyncPartnersData.fulfilled, (state, { payload }) => ({
        ...state,
        partnersData: payload,
        loader: false,
      }));
  },
});

export default partnersSlice.reducer;
