import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";
const initialState = [];
const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const getAllUsers = (token) => {
  return async (dispatch) => {
    const users = await userService.getAll(token);
    dispatch(setUsers(users));
  };
};
export const { setUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;
