import axios from "axios";

const baseUrl = "/api/blogs";
const config = (token) => {
  return {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
};

const updateComments = async (fieldsToPatch, blogId, token) => {
  const response = await axios.patch(
    `${baseUrl}/${blogId}/comments`,
    fieldsToPatch,
    config(token)
  );
  return response.data;
};

const getAll = async (token) => {
  const response = await axios.get(baseUrl, config(token));

  return response.data;
};

const getBlogById = async (blogId, token) => {
  const response = await axios.get(`${baseUrl}/${blogId}`, config(token));

  return response.data;
};

const createBlog = async (blog, token) => {
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

const updateBlog = async (fieldsToPatch, blogId, token) => {
  const response = await axios.patch(
    `${baseUrl}/${blogId}`,
    fieldsToPatch,
    config(token)
  );
  return response.data;
};

const removeBlog = async (blogId, token) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export default {
  getAll,
  getBlogById,
  createBlog,
  updateBlog,
  removeBlog,
  updateComments,
};
