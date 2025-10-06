import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOurTeamDetails } from "../../utils/models/our-team.model";

export const fetchAsyncOurTeamDetailsData = createAsyncThunk(
  "ourTeam/fetchAsyncOurTeamDetailsData",
  async () => {
    const res: IOurTeamDetails[] = await fetch("/data/our-team.json")
      .then((res) => res.json())
      .then((data) => data);
    return res;
  }
);

const initialState: {
  ourTeamDetailData: IOurTeamDetails[];
  loader: boolean;
} = { ourTeamDetailData: [], loader: false };

const ourTeamSlice = createSlice({
  name: "ourTeam",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncOurTeamDetailsData.pending, (state) => ({
        ...state,
        loader: true,
      }))
      .addCase(
        fetchAsyncOurTeamDetailsData.fulfilled,
        (state, { payload }) => ({
          ...state,
          ourTeamDetailData: payload,
          loader: false,
        })
      );
  },
});

export default ourTeamSlice.reducer;
