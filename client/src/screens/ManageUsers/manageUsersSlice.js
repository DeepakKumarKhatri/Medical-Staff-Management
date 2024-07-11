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

export const deleteDoctor = createAsyncThunk(
  "manageUsers/deleteDoctors",
  async (doctorID, thunkAPI) => {
    try {
      const response = await fetch(`${server_url}/api/clinic_manager/doctors`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ doctorID }),
      });
      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error);
      }
      const data = await response.json();
      return { data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: "Network error" });
    }
  }
);

export const deleteClinicManager = createAsyncThunk(
  "manageUsers/deleteClinicManager",
  async (clinicManagerID, thunkAPI) => {
    try {
      const response = await fetch(
        `${server_url}/api/clinic_manager/clinic_managers`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ clinicManagerID }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error);
      }
      const data = await response.json();
      return { data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: "Network error" });
    }
  }
);

export const deletePatient = createAsyncThunk(
  "manageUsers/deletePatient",
  async (patientID, thunkAPI) => {
    try {
      const response = await fetch(
        `${server_url}/api/clinic_manager/patients`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ patientID }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error);
      }
      const data = await response.json();
      return { data };
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

    builder
      .addCase(deleteDoctor.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = state.doctors.filter(
          (doctor) => doctor._id !== action.payload.data.doctor._id
        );
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload
          ? action.payload.message
          : "Failed to delete doctor";
      })
      .addCase(deleteClinicManager.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(deleteClinicManager.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clinicManagers = state.clinicManagers.filter(
          (manager) => manager._id !== action.payload.data.clinicManager._id
        );
      })
      .addCase(deleteClinicManager.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload
          ? action.payload.message
          : "Failed to delete clinic manager";
      })
      .addCase(deletePatient.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = state.patients.filter(
          (patient) => patient._id !== action.payload.data.patient._id
        );
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload
          ? action.payload.message
          : "Failed to delete patient";
      });
  },
});

export default manageUsersSlice.reducer;
