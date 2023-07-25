import { createSlice } from "@reduxjs/toolkit";
const initialViewState = {
  mail: [],
  containData: false,
};
const viewMailSlice = createSlice({
  name: "viewMail",
  initialState: initialViewState,
  reducers: {
    seeMail(state, action) {
      state.mail = [action.payload];
      state.containData = true;
    },
  },
});
export const viewMailActions = viewMailSlice.actions;
export default viewMailSlice.reducer;
