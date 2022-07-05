import axios from "axios";

const baseUrl = "/api/users";
const config = (token) => {
  return {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
};

const getUserById = async (blogId, token) => {
  const response = await axios.get(`${baseUrl}/${blogId}`, config(token));
  return response.data;
};

const getAll = async (token) => {
  const response = await axios.get(baseUrl, config(token));
  return response.data;
};

export default {
  getAll,
  getUserById,
};
