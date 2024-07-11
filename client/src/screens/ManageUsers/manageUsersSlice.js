import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server_url } from "../../constants/server_url";

export const getDoctors = createAsyncThunk(
  "manageUsers/getDoctors",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${server_url}/api/clinic_manager/doctors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error);
      }
      const data = await response.json();
      return { doctors: data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: "Network error" });
    }
  }
);

export const getPatients = createAsyncThunk(
  "manageUsers/getPatients",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `${server_url}/api/clinic_manager/patients`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error);
      }
      const data = await response.json();
      return { patients: data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: "Network error" });
    }
  }
);

export const getClinicManagers = createAsyncThunk(
  "manageUsers/getClinicManagers",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `${server_url}/api/clinic_manager/clinic_managers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error);
      }
      const data = await response.json();
      return { clinicManagers: data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: "Network error" });
    }
  }
);

const manageUsersSlice = createSlice({
  name: "manageUsers",
  initialState: {
    isLoading: false,
    doctors: [],
    patients: [],
    clinicManagers: [],
    isError: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload.doctors;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getDoctors.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload.message || "Unable to get data from server";
      });

    builder
      .addCase(getPatients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = action.payload.patients;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getPatients.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload.message || "Unable to get data from server";
      });

    builder
      .addCase(getClinicManagers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clinicManagers = action.payload.clinicManagers;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getClinicManagers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getClinicManagers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload.message || "Unable to get data from server";
      });
  },
});

export default manageUsersSlice.reducer;
