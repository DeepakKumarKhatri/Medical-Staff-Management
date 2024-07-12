import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ImageInput from "../Generals/ImageInput";
import { generateCredentials } from "../../lib/generateCreditionals";

const AddDoctor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const [profileImage, setProfileImage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleUpdate = () => {
    const doctorData = {
      firstName,
      lastName,
      yearsOfExperience,
      department,
      gender,
      id: credentials.id,
      password: credentials.password,
      profileImage,
    };

    console.log({ doctorData });

    // Perform further actions such as submitting data to a server
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleGenerateCredentials = () => {
    setCredentials(generateCredentials());
  };

  const handleCopyCredentials = () => {
    const text = `ID: ${credentials.id}, Password: ${credentials.password}`;
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarOpen(true);
    });
  };

  const handleCloseCredentialsSnackbar = () => {
    setSnackbarOpen(false);
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
      <Typography variant="h4" gutterBottom>
        Add Doctor
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="First Name"
            variant="standard"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Last Name"
            variant="standard"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Years of Experience"
            variant="standard"
            fullWidth
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl sx={{ minWidth: 250 }}>
            <InputLabel id="department-select-label">Department</InputLabel>
            <Select
              labelId="department-select-label"
              id="department-select"
              value={department}
              label="Department"
              onChange={(e) => setDepartment(e.target.value)}
            >
              <MenuItem value="Cardiology">Cardiology</MenuItem>
              <MenuItem value="Neurology">Neurology</MenuItem>
              <MenuItem value="Orthopedics">Orthopedics</MenuItem>
              <MenuItem value="Pediatrics">Pediatrics</MenuItem>
              <MenuItem value="General Medicine">General Medicine</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl sx={{ m: 1, minWidth: 100 }}>
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              value={gender}
              label="Gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Button variant="outlined" onClick={handleGenerateCredentials}>
              Generate Credentials
            </Button>
            <TextField label="ID" value={credentials.id} readOnly fullWidth />
            <TextField
              label="Password"
              value={credentials.password}
              readOnly
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCopyCredentials}
            >
              Copy to Clipboard
            </Button>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={handleCloseCredentialsSnackbar}
            >
              <Alert
                onClose={handleCloseCredentialsSnackbar}
                severity="success"
                sx={{ width: "100%" }}
              >
                Credentials copied to clipboard!
              </Alert>
            </Snackbar>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <ImageInput
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Add Doctor
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Doctor added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddDoctor;
