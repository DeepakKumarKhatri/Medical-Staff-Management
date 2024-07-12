import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server_url } from "../../constants/server_url";

export const addPatient = createAsyncThunk(
  "doctor/addPatient",
  async (patientData, thunkAPI) => {
    try {
      const response = await fetch(`${server_url}/api/doctor/add_patient`, {
        method: "POST",
        body: JSON.stringify(patientData),
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

export const getPatients = createAsyncThunk(
  "doctor/getPatients",
  async (doctorId, thunkAPI) => {
    try {
      const response = await fetch(`${server_url}/api/doctor/get_patients`, {
        method: "POST",
        body: JSON.stringify({ doctorId }),
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
    builder.addCase(getPatients.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(getPatients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.patients = action.payload.patients;
    });
    builder.addCase(getPatients.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload
        ? action.payload.message || "FAILED TO RETRIEVE PATIENTS"
        : "FAILED TO RETRIEVE PATIENTS";
    });
  },
});

export default doctorSlice.reducer;
