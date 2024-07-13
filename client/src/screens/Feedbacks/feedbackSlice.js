import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server_url } from "../../constants/server_url";

export const getFeedback = createAsyncThunk(
  "feedback/getFeedback",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `${server_url}/api/clinic_manager/get_feedback`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error);
      }
      const data = await response.json(); 
      return { doctors: data.doctors, patients: data.patients };
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: "Network error" });
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    isLoading: false,
    isError: false,
    doctorsFeedback: [],
    patientsFeedback: [],
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedback.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(getFeedback.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.doctorsFeedback = action.payload.doctors;
      state.patientsFeedback = action.payload.patients;
    });
    builder.addCase(getFeedback.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload
        ? action.payload.message || "FAILED"
        : "FAILED";
    });
  },
});

export default feedbackSlice.reducer;
