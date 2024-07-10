import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server_url } from "../../constants/server_url";

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (userData, thunkAPI) => {
    try {
      const response = await fetch(`${server_url}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error);
      }
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: "Network error" });
    }
  }
);

export const userSignUp = createAsyncThunk(
  "auth/userSignUp",
  async (userData, thunkAPI) => {
    try {
      const response = await fetch(`${server_url}/api/patient/register`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error);
      }
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: "Network error" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: null,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      document.cookie = "token=; Max-Age=0; path=/;"; // Clear the cookie
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.message || "Login failed";
    });
    builder.addCase(userSignUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(userSignUp.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(userSignUp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.message || "SignUp failed";
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
