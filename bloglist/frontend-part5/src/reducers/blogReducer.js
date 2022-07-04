import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import helperService from "../services/helper";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    getOrderedBlogs(state, action) {
      return helperService.sortBlogs(action.payload);
    },
  },
});

export const getAllBlogs = (token) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll(token);
    dispatch(getOrderedBlogs(blogs));
  };
};

//in case i change blogs structure i only have to change selector here
export const setSelectorBlogs = () => {
  return (state) => state.blogs;
};

export const setBlogs = (blogs) => {
  return (dispatch) => dispatch(getOrderedBlogs(blogs));
};

export const updateBlog = (blogs, id, newBlog, token) => {
  return async (dispatch) => {
    // console.log(id, newBlog);
    await blogService.updateBlog(id, newBlog, token);

    const newBlogs = blogs.map((blog) =>
      blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
    );

    dispatch(getOrderedBlogs(newBlogs));
  };
};

export const { getOrderedBlogs } = blogSlice.actions;
export default blogSlice.reducer;
