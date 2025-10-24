import axios from 'axios';


const backend_url = import.meta.env.VITE_BACKEND_URL;;

const taskService = {
  createTask: async (houseId, taskData, token) => {
    try {
      const response = await axios.post(`${backend_url}/task/house/${houseId}`, taskData, {
        headers: {
          "Content-Type": "application/json",
          token : token
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create task' };
    }
  },
};

export default taskService;