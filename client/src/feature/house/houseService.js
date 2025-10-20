import axios from "axios";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const createHouse = async (houseData, token) => {
  const response = await axios.post(
    `${backend_url}/api/house/create`,
    houseData,
    {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    }
  );
  return response.data;
};

const joinHouse = async (joinCode, token) => {
  const response = await axios.post(
    `${backend_url}/api/house/joinhouse/`,
    { joinCode },
    {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    }
  );
  return response.data;
};

const getUserHouse = async (token) => {
  const response = await axios.get(`${backend_url}/api/house/userHouse`, {
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });
  return response.data;
};

const getHouseById = async (id, token) => {
  const response = await axios.get(`${backend_url}/api/house/${id}`, {
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });
  return response.data;
};

const houseService = {
  createHouse,
  getUserHouse,
  getHouseById,
  joinHouse,
};

export default houseService;
