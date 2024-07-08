import React from "react";
import { Avatar, Box, Button } from "@mui/material";

const ImageInput = ({ profileImage, setProfileImage }) => {
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
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
