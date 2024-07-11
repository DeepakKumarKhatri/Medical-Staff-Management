import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  },
});

export default clinicManagerUsersSlice.reducer;
