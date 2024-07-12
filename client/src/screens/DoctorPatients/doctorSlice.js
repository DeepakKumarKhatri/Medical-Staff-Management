import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server_url } from "../../constants/server_url";

export const addPatient = createAsyncThunk(
  "doctor/addPatient",
  async (patientData, thunkAPI) => {
    try {
      const response = await fetch(
        `${server_url}/api/doctor/add_patient`,
        {
          method: "POST",
          body: JSON.stringify(patientData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
  name: "doctor",
  initialState: {
    isLoading: false,
    patients: [],
    isError: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder.addCase(addPatient.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addPatient.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addPatient.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload
        ? action.payload.message || "FAILED TO ADD PATIENT"
        : "FAILED TO ADD PATIENT";
    });
  },
});

export default doctorSlice.reducer;
