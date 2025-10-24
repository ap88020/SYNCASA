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
      });
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