import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server_url } from "../../constants/server_url";

export const addPatientSubmission = createAsyncThunk(
  "patient/addPatientSubmission",
  async (formData, thunkAPI) => {
    try {
      const response = await fetch(`${server_url}/api/patient/add_submission`, {
        method: "PATCH",
        body: JSON.stringify(formData),
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

const doctorSlice = createSlice({
  name: "patient",
  initialState: {
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder.addCase(addPatientSubmission.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addPatientSubmission.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.patients.push(action.payload.patient);
    });
    builder.addCase(addPatientSubmission.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload
        ? action.payload.message || "FAILED"
        : "FAILED";
    });
  },
});

export default doctorSlice.reducer;
