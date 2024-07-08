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
  const [formValues, setFormValues] = useState({
    firstName: "John",
    lastName: "Doe",
    yearsOfExperience: 10,
    id: "",
    password: "",
    profileImage: "https://avatars.githubusercontent.com/u/86526696?v=4",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormValues((prevValues) => ({
        ...prevValues,
        profileImage: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        m: 4,
        p: 4,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
      }}
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
                name="firstName"
                value={formValues.firstName}
                onChange={handleInputChange}
                disabled={comingFrom === "profile"}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="standard-basic"
                label="Last Name"
                variant="standard"
                fullWidth
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
                disabled={comingFrom === "profile"}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Years of Experience"
                fullWidth
                name="yearsOfExperience"
                value={formValues.yearsOfExperience}
                onChange={handleInputChange}
                disabled={comingFrom === "profile"}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DepartmentDropdown comingFrom={comingFrom} />
            </Grid>
            {/* New Row for ID and Password */}
            <Grid item xs={12} sm={6}>
              <TextField
                id="standard-basic"
                label="ID"
                variant="standard"
                fullWidth
                name="id"
                value={formValues.id}
                onChange={handleInputChange}
                disabled={comingFrom === "profile"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="standard-basic"
                label="Password"
                type="password"
                variant="standard"
                fullWidth
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
                disabled={comingFrom === "profile"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ textAlign: "center" }}>
          <Avatar
            alt="Doctor Profile"
            src={formValues.profileImage}
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
