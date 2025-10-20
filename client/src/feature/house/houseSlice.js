// houseSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import houseService from "./houseService";

const initialState = {
  houses: [],
  currentHouse: null,
  loading: false,
  success: false,
  message: "",
};

// ✅ Create House
export const createHouse = createAsyncThunk(
  "house/create",
  async (houseData, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user?.token;
      return await houseService.createHouse(houseData, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// ✅ Get User Houses
export const getUserHouse = createAsyncThunk(
  "house/getUserHouse",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user?.token;
      return await houseService.getUserHouse(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// ✅ Join House
export const joinHouse = createAsyncThunk(
  "house/join",
  async ({ joinCode }, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user?.token;
      return await houseService.joinHouse( joinCode, token );
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

const houseSlice = createSlice({
  name: "house",
  initialState,
  reducers: {
    resetHouse: (state) => {
      state.loading = false;
      state.message = "";
      state.success = false;
    },
    setCurrentHouse: (state, action) => {
      state.currentHouse = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Create House
      .addCase(createHouse.pending, (state) => {
        state.loading = true;
      })
      .addCase(createHouse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.houses.push(action.payload.data);
        state.message = "House created successfully";
      })
      .addCase(createHouse.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload;
      })

      // ✅ Join House
      .addCase(joinHouse.pending, (state) => {
        state.loading = true;
      })
      .addCase(joinHouse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.houses.push(action.payload.data);
        state.message = "Joined house successfully";
      })
      .addCase(joinHouse.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload;
      })

      // ✅ Get User Houses
      .addCase(getUserHouse.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserHouse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.houses = action.payload.data;
      })
      .addCase(getUserHouse.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload;
      });
  },
});

export const { resetHouse, setCurrentHouse } = houseSlice.actions;
export default houseSlice.reducer;
