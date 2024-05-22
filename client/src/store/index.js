import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./slice/userDataSlice";
import detailsReducer from "./slice/detailsSlice";
import searchReducer from "./slice/searchSlice";

const store = configureStore({
  reducer: {
    userData: userDataReducer,
    details: detailsReducer,
    search: searchReducer,
  },
});

export default store;
