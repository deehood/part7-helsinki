import { createSlice } from "@reduxjs/toolkit";
const initialState = null;
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    doNotification(state, action) {
      state = action.payload;
      // console.log(state);  obj
      return state;
    },
  },
});

export const setNotification = (msg, type, seconds) => {
  return (dispatch) => {
    dispatch(doNotification({ msg: msg, type: type }));

    if (timeoutID) clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      dispatch(doNotification(null));
    }, seconds * 1000);
  };
};

let timeoutID;
export const { doNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
