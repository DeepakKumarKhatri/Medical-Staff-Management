import React from "react";
import { Avatar, Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { uploadImage } from "../ClinicManagerUsers/clinicManagerUsersSlice";

const ImageInput = ({ profileImage, setProfileImage }) => {
  const dispatch = useDispatch();

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "medicoWebApp");

      try {
        const response = await dispatch(uploadImage(formData));
        if (response.payload && response.payload.secure_url) {
          setProfileImage(response.payload.secure_url);
        } else {
          console.error("Failed to upload image:", response.payload);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <Box alignItems="center">
      <Avatar
        alt="User Profile"
        src={profileImage}
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <Button variant="outlined" component="label">
        Change Image
        <input type="file" hidden onChange={handleImageChange} />
      </Button>
    </Box>
  );
};

export default ImageInput;
