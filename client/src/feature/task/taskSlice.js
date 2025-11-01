import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from './taskService';

// Get token from store or localStorage
const getToken = (getState) => {
  return getState().auth.user?.token || localStorage.getItem('token');
};

// Async thunk for creating task
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({ houseId, taskData }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      const response = await taskService.createTask(houseId, taskData, token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getTask = createAsyncThunk(
  'task/getTask',
  async ({houseId}, {getState,rejectWithValue}) => {
    try {
      const token = getToken(getState);
      const response = await taskService.getTask(houseId,token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)
export const completeTask = createAsyncThunk(
  'task/completeTask',
  async ({taskId}, {getState,rejectWithValue}) => {
    try {
      const token = getToken(getState);
      const response = await taskService.completeTask(taskId,token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }  
)

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async ({taskId} , {getState,rejectWithValue}) => {
    try {
      const token = getToken(getState);
      const response = await taskService.deleteTask(taskId,token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    success: false,
    createdTask: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.createdTask = null;
    },
    resetTaskState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.createdTask = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.createdTask = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.createdTask = action.payload.data;
        
        // Add the created task to tasks array
        if (action.payload.data) {
          state.tasks.push(action.payload.data);
        }
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create task';
        state.success = false;
        state.createdTask = null;
      })
      // getTask
      .addCase(getTask.pending,(state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTask.fulfilled,(state,action) => {
        state.loading = false;
        state.tasks = action.payload.data || []
      })
      .addCase(getTask.rejected,(state,action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to get task'
      })
      //Complete Task 
      .addCase(completeTask.pending,(state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(completeTask.fulfilled,(state,action) => {
          // console.log("completeTask payload:", action.payload);
        state.loading = false;
        state.success = true;
        state.tasks = state.tasks.map(task => task._id === action.payload.data._id ? action.payload.data : task);
      })
      .addCase(completeTask.rejected,(state,action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to complete task'
      })
      // Delete-Task
      .addCase(deleteTask.pending,(state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteTask.fulfilled,(state,action) => {
        state.loading = false;
        state.success = true;
        // const deletId = action.meta.arg.taskId;
        state.tasks = state.tasks.filter(task => task._id !== action.payload.data._id)
      })
      .addCase(deleteTask.rejected,(state,action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete task'
      })
  },
});

export const { 
  clearError, 
  clearSuccess, 
  resetTaskState, 
  updateTaskStatus, 
  addTask 
} = taskSlice.actions;

export default taskSlice.reducer;