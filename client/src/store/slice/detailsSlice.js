import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTitle: "나의 펀딩 내역",
  currentCategory: "funding",
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setTitle(state, action) {
      state.currentTitle = action.payload;
    },
    setCategory(state, action) {
      state.currentCategory = action.payload;
    },
  },
});
export const { setTitle, setCategory } = detailsSlice.actions;
// export const userDetailsActions = userDetailsSlice.actions;
export default detailsSlice.reducer;
