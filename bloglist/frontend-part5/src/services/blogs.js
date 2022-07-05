import axios from "axios";

const baseUrl = "/api/blogs";
const config = (token) => {
  return {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
};

const getAll = async (token) => {
  const response = await axios.get(baseUrl, config(token));

  return response.data;
};

const createBlog = async (blog, token) => {
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

const getUserById = async (blogId, token) => {
  const response = await axios.get(`${baseUrl}/${blogId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.user;
};

const updateBlog = async (blog, token) => {
  const response = await axios.put(
    `${baseUrl}/${blog.id}`,
    blog,
    config(token)
  );
  return response.data;
};

const removeBlog = async (id, token) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export default {
  getAll,
  createBlog,
  getUserById,
  updateBlog,
  removeBlog,
};
