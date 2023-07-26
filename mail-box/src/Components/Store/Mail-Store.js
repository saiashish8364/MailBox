import { configureStore } from "@reduxjs/toolkit";
import viewMailReducer from "./ViewMailSlice";
import unReadMailReducer from "./UnreadMails";

const store = configureStore({
  reducer: { viewMail: viewMailReducer, count: unReadMailReducer },
});

export default store;
