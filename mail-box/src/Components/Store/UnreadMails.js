import { createSlice } from "@reduxjs/toolkit";

const UnreadMailsSlice = createSlice({
  name: "unread-mails",
  initialState: {
    count: 0,
  },
  reducers: {
    countUnreadMails(state, action) {
      state.count = Number(state.count) + Number(action.payload);
    },
    removeReadMails(state, action) {
      state.count = Number(state.count) - Number(action.payload);
    },
  },
});
export const unreadMailCount = () => {
  return async (dispatch) => {
    const loadData = async () => {
      const response = await fetch(
        `https://mail-box-39d58-default-rtdb.asia-southeast1.firebasedatabase.app/Mails/${String(
          localStorage.getItem("email")
        )}/inbox.json`
      );
      if (response.ok) {
        const data = await response.json();
        const inboxData = Object.entries(data).map(([key, email]) => ({
          id: key,
          body: email.body,
          from: email.from,
          subject: email.subject,
          state: email.state,
        }));
        return inboxData;
      }
    };
    try {
      const inData = await loadData();
      for (let i = 0; i < inData.length; i++) {
        if (inData[i].state === "unread") {
          dispatch(UnreadMailsSlice.actions.countUnreadMails(1));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const unreadMailActions = UnreadMailsSlice.actions;
export default UnreadMailsSlice.reducer;
