import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";

const getUserFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
}

const initialState = {
    user: getUserFromLocalStorage(),
    success: false,
    loading: false,
    message: ""
}
export const getProfile = createAsyncThunk(
    "auth/getProfile",
    async (_, thunkApi) => {
        try {
            const response = await authService.getProfile();
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkApi.rejectWithValue(message);
        }
    }
)

export const updateProfile = createAsyncThunk(
    "auth/upateProfile",
    async (userData,thunkApi) => {
        try {
            const response = await authService.updateProfile(userData);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkApi.rejectWithValue(message);
        }
    }
)

// ✅ FIX: Remove initialState parameter
export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkApi) => { // ✅ initialState was here by mistake
        try {
            const response = await authService.register(userData);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkApi.rejectWithValue(message);
        }
    }
)

// ✅ FIX: Remove initialState parameter
export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkApi) => { // ✅ initialState was here by mistake
        try {
            const response = await authService.login(userData);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkApi.rejectWithValue(message);
        }
    }
)

// ✅ FIX: Remove initialState parameter
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkApi) => { // ✅ initialState was here by mistake
        try {
            authService.logout();
            return null;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkApi.rejectWithValue(message);
        }
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.success = false;
            state.message = "";
        },
        clearMessage: (state) => {
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // Register cases
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.message = "";
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                // ✅ FIX: Store user data properly
                state.user = {
                    token: action.payload.token,
                    ...action.payload.user // Spread the user object
                };
                state.message = "Register successfully!";
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.message = action.payload;
                state.user = null;
            })
            // Login cases
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.message = "";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                // ✅ FIX: Store user data properly
                state.user = {
                    token: action.payload.token,
                    ...action.payload.user // Spread the user object
                };
                state.message = "Login successful!"; 
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.message = action.payload;
                state.user = null;
            })
            // updateProfile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.message = "";
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                // ✅ FIX: Merge updated user data
                state.user = {
                    ...state.user,
                    ...action.payload.user
                };
                state.message = "Updated successfull"
            })
            .addCase(updateProfile.rejected,(state,action) => {
                state.loading = false;
                state.success = false;
                state.message = action.payload;
            })
            // getProfile
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.message = "";
            })
            .addCase(getProfile.fulfilled, (state,action) => {
                state.loading = false;
                state.success = true;
                // ✅ FIX: Merge profile data properly
                state.user = {
                    ...state.user,
                    ...action.payload.user
                };
                state.message = "Profile added successfully!"
            })
            .addCase(getProfile.rejected, (state,action) => {
                state.loading = false;
                state.success = false;
                state.message = action.payload;
            })
            // Logout cases
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.success = false;
                state.message = "Logged out successfully!";
            });
    }
});

export const { reset, clearMessage } = authSlice.actions;
export default authSlice.reducer;