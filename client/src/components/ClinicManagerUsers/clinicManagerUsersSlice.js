import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server_url } from "../../constants/server_url";

export const uploadImage = createAsyncThunk(
  "clinicManagerUsers/uploadImage",
  async (formData, thunkAPI) => {
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dbpbuyqta/image/upload`,
        {
          method: "POST",
          body: formData,
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

export const addDoctor = createAsyncThunk(
  "clinicManagerUsers/addDoctor",
  async (doctorData, thunkAPI) => {
    try {
      const response = await fetch(
        `${server_url}/api/clinic_manager/add_doctor`,
        {
          method: "POST",
          body: JSON.stringify(doctorData),
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

export const addPatient = createAsyncThunk(
  "clinicManagerUsers/addPatient",
  async (patientData, thunkAPI) => {
    try {
      const response = await fetch(
        `${server_url}/api/clinic_manager/add_patient`,
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

export const addClinicManager = createAsyncThunk(
  "clinicManagerUsers/addClinicManager",
  async (clinicManagerData, thunkAPI) => {
    try {
      const response = await fetch(
        `${server_url}/api/clinic_manager/add_manager`,
        {
          method: "POST",
          body: JSON.stringify(clinicManagerData),
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

export const updateProfile = createAsyncThunk(
  "clinicManagerUsers/updateProfile",
  async (clinicManagerData, thunkAPI) => {
    try {
      const response = await fetch(
        `${server_url}/api/clinic_manager/update_profile`,
        {
          method: "PATCH",
          body: JSON.stringify(clinicManagerData),
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

const clinicManagerUsersSlice = createSlice({
  name: "clinicManagerUsers",
  initialState: {
    isLoading: false,
    image: "",
    isError: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImage.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(uploadImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.image = action.payload.secure_url;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(uploadImage.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload
        ? action.payload.message || "Image upload failed"
        : "Image upload failed";
    });
    builder.addCase(addDoctor.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addDoctor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.image = action.payload.secure_url;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addDoctor.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload
        ? action.payload.message || "FAILED TO ADD DOCTOR"
        : "FAILED TO ADD DOCTOR";
    });
    builder.addCase(addPatient.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addPatient.fulfilled, (state, action) => {
      state.isLoading = false;
      state.image = action.payload.secure_url;
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
    builder.addCase(addClinicManager.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addClinicManager.fulfilled, (state, action) => {
      state.isLoading = false;
      state.image = action.payload.secure_url;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(addClinicManager.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload
        ? action.payload.message || "FAILED TO ADD CLINIC MANAGER"
        : "FAILED TO ADD CLINIC MANAGER";
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.image = action.payload.secure_url;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload
        ? action.payload.message || "FAILED TO UPDATE PROFILE"
        : "FAILED TO UPDATE PROFILE";
    });
  },
});

export default clinicManagerUsersSlice.reducer;
