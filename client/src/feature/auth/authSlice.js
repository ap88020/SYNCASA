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
                state.user = action.payload;
                state.message = "Register successfully!";
                console.log("Register successful - User:", action.payload); // ✅ Debug
                console.log("Token stored in localStorage:", localStorage.getItem("token")); // ✅ Debug
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.message = action.payload;
                state.user = null;
            })
            // ✅ FIX: Changed from "Logout" to "Login" cases
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.message = "";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload;
                state.message = "Login successful!"; // ✅ FIX: Typo
                console.log("login successful - User:", action.payload); // ✅ Debug
                console.log("Token stored in localStorage:", localStorage.getItem("token")); // ✅ Debug
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.message = action.payload;
                state.user = null;
            })
            // getProfile
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.message = "";
            })
            .addCase(getProfile.fulfilled, (state,action) => {
                state.loading = false;
                state.success = true;
                state.user = {
                    ...state.user,
                    ...action.payload.user
                }
                state.message = "Profile added successfully!"
                console.log("profile loaded.. : ", action.payload)
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