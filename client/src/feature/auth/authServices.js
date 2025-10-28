import axios from "axios";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const register = async (userData) => {
  // console.log("Registering with:", userData);
  const response = await axios.post(`${backend_url}/user/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  // console.log("Register response:", response.data);

  if (response.data.success) {
    // console.log("Setting token:", response.data.token);
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

const login = async (userData) => {
  // console.log("Logging in with:", userData);
  const response = await axios.post(`${backend_url}/user/login`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  // console.log("Login response:", response.data);

  if (response.data.success) {
    // console.log("Setting token:", response.data.token);
    // localStorage.setItem("token", response.data.token);
  }

  return response.data;
};
const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(`${backend_url}/user/profile`, {
      headers: { token: token },
    });

    // if (response.data && response.data.success) {
        // console.log("Profile data:", response.data);
    // } else {
    //     console.log("Unexpected response format:", response);
    // }

    return response.data;
  } catch (error) {
    // console.error("Get profile error:", error);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to get profile",
    };
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

const updateProfile = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new error("No token found");
    }

    const response = await axios.post(`${backend_url}/update`, userData, {
      headers: { token: token },
    });

    return response.data;
  } catch (error) {
    // console.error("Get profile error:", error);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to get profile",
    };
  }
};

const authService = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
};

export default authService;
