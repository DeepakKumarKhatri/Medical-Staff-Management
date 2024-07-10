import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server_url } from "../../constants/server_url";

export const userLogin = createAsyncThunk("userLogin", async (userData, thunkAPI) => {
  try {
    const response = await fetch(`${server_url}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json",
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
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
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
  },
});

export default authSlice.reducer;
