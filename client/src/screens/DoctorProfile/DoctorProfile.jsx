import React, { useState } from "react";
import {
  Avatar,
  TextField,
  Box,
  Grid,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import DepartmentDropdown from "../../components/Dropdown/DepartmentDropdown";
import GenderDropdown from "../../components/Dropdown/GenderDropdown";

const DoctorProfile = ({ comingFrom }) => {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [yearsOfExperience, setYearsOfExperience] = useState(10);
  const [profileImage, setProfileImage] = useState(
    "https://avatars.githubusercontent.com/u/86526696?v=4"
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpdate = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{ p: 4, bgcolor: "background.paper", boxShadow: 3, borderRadius: 2 }}
    >
      <Typography variant="h4" gutterBottom className="text-blue-900 mb-2">
        Doctor Profile
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Dr."
                disabled
                fullWidth
                value="Dr."
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="standard-basic"
                label="First Name"
                variant="standard"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={comingFrom === "profile"}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="standard-basic"
                label="Last Name"
                variant="standard"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={comingFrom === "profile"}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Years of Experience"
                fullWidth
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                disabled={comingFrom === "profile"}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DepartmentDropdown comingFrom={comingFrom} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ textAlign: "center" }}>
          <Avatar
            alt="Doctor Profile"
            src={profileImage}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          {comingFrom === "edit-profile" && (
            <Button variant="outlined" component="label" sx={{ mb: 2 }}>
              Change Image
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
          )}
          <GenderDropdown comingFrom={comingFrom} />
        </Grid>
      </Grid>
      {comingFrom === "edit-profile" && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3, backgroundColor: "#E68369" }}
          onClick={handleUpdate}
        >
          Update
        </Button>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DoctorProfile;
