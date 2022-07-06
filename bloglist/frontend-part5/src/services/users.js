import axios from "axios";

const baseUrl = "/api/users";
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

const getUserById = async (userId, token) => {
  const response = await axios.get(`${baseUrl}/${userId}`, config(token));
  return response.data;
};

export default {
  getAll,
  getUserById,
};
