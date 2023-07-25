import { configureStore } from "@reduxjs/toolkit";
import viewMailReducer from "./ViewMailSlice";

const store = configureStore({
  reducer: { viewMail: viewMailReducer },
});

export default store;
