import { createSlice } from "@reduxjs/toolkit";
// import blog from "../../../backend-part5/models/blog";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";
import { getAllUsers } from "./allUsersReducer";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    // can be refactored to sort by field
    getOrderedBlogs(state, action) {
      const sorted = [...action.payload].sort((a, b) => b.likes - a.likes);
      return sorted;
    },
    deleteBlogFromState(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    appendBlog(state, action) {
      return state.concat(action.payload);
    },
    updateBlog(state, action) {
      const newBlog = action.payload;
      return state.map((blog) => (blog.id === newBlog.id ? newBlog : blog));
    },
  },
});

//in case i change blogs structure i only have to change selector here
export const setSelectorBlogs = () => {
  return (state) => state.blogs;
};

export const createComment = (blog, comment, token) => {
  return async (dispatch, getState) => {
    const newBlog = await blogService.updateComments(
      { comments: blog.comments.concat(comment) },
      blog.id,
      token
    );
    await dispatch(updateBlog(newBlog));
    // order blogs by likes
    const blogs = getState().blogs;
    dispatch(getOrderedBlogs(blogs));
  };
};

export const getAllBlogs = (token) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll(token);
    dispatch(getOrderedBlogs(blogs));
  };
};

export const deleteBlog = (id, token) => {
  return async (dispatch) => {
    try {
      await blogService.removeBlog(id, token);
    } catch (exception) {
      return;
    }
    dispatch(deleteBlogFromState(id));

    // AllUsers have the blogs array so thy must update too
    dispatch(getAllUsers());
  };
};

export const createBlog = (blog, token) => {
  return async (dispatch) => {
    let blogToAppend = {};

    try {
      blogToAppend = await blogService.createBlog(blog, token);
    } catch (exception) {
      exception.response.data.error
        ? dispatch(setNotification(exception.response.data.error, "error", 2))
        : dispatch(setNotification(exception.response.statusText, "error", 2));
      // return so it doesn't continue executing
      return;
    }
    dispatch(appendBlog(blogToAppend));
    // AllUsers have the blogs array so thy must update too
    dispatch(getAllUsers());

    dispatch(
      setNotification(`Added ${blog.title} by ${blog.author}`, "normal", 2)
    );
  };
};

export const incrementLikes = (blog, token) => {
  return async (dispatch, getState) => {
    const newBlog = await blogService.updateBlog(
      { likes: blog.likes + 1 },
      blog.id,
      token
    );
    await dispatch(updateBlog(newBlog));
    // order blogs by likes
    const blogs = getState().blogs;
    dispatch(getOrderedBlogs(blogs));
  };
};

export const { getOrderedBlogs, deleteBlogFromState, appendBlog, updateBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
