import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
// import helperService from "../services/helper";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    getOrderedBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
  },
});

export const getAllBlogs = (token) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll(token);
    // const orderedBlogs = helperService.sortBlogs([...blogs]);
    dispatch(getOrderedBlogs(blogs));
  };
};

export const setBlogs = (blogs) => {
  return (dispatch) => dispatch(getOrderedBlogs(blogs));
};

export const updateBlog = (blogs, id, newBlog, token) => {
  return async (dispatch) => {
    await blogService.updateBlog(id, newBlog, token);

    // const temp = [...blogs];
    // const blogIndex = temp.findIndex((x) => x.id === blog.id);
    // temp[blogIndex].likes = newBlog.likes;

    dispatch(getOrderedBlogs(blogs));
  };
};

export const { getOrderedBlogs } = blogSlice.actions;
export default blogSlice.reducer;
