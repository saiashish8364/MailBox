import { configureStore } from "@reduxjs/toolkit";
import viewMailReducer from "./ViewMailSlice";
import unReadMailReducer from "./UnreadMails";
import authReducer from "./AuthSlice";

const store = configureStore({
  reducer: {
    viewMail: viewMailReducer,
    count: unReadMailReducer,
    auth: authReducer,
  },
});

export default store;
