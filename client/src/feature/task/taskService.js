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
  getTask: async(houseId,token) => {
    try {
      const response = await axios.get(`${backend_url}/task/data/${houseId}`,{
        headers:{
          "Content-Type":"application/json",
          token:token
        }
      })
      return response.data;
    } catch (error) {
      throw error.response?.data || {message:'Failed to get task'}
    }
  },
  completeTask: async(taskId,token) => {
    try {
      const response = await axios.post(`${backend_url}/task/complete/${taskId}`,{},{
        headers:{
          "Content-Type":"application/json",
          token:token
        }
      })
      return response.data;
    } catch (error) {
      throw error.response?.data || {message:'Failed to complete task'}
    }
  }
  
};


export default taskService;