import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import helperService from "../services/helper";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    getBlogs(state, action) {
      return action.payload;
    },
  },
});

export const getAllBlogs = (token) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll(token);
    const orderedBlogs = helperService.sortBlogs([...blogs]);
    dispatch(getBlogs(orderedBlogs));
  };
};

export const refreshBlogs = (blogs) => {
  return (dispatch) => {
    const orderedBlogs = helperService.sortBlogs([...blogs]);
    dispatch(getBlogs(orderedBlogs));
  };
};

export const setBlogs = (blogs) => {
  return (dispatch) => dispatch(getBlogs(blogs));
};

export const { getBlogs } = blogSlice.actions;
export default blogSlice.reducer;
