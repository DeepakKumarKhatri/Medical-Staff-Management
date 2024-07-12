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
import { useDispatch, useSelector } from "react-redux";
import { addPatient } from "../ClinicManagerUsers/clinicManagerUsersSlice";

const AddPatient = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const [profileImage, setProfileImage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage } = useSelector(
    (state) => state.clinicManagerUsers
  );

  const handleUpdate = () => {
    const patientData = {
      firstName,
      lastName,
      gender,
      id: credentials.id,
      password: credentials.password,
      profileImage,
    };
    
    dispatch(addPatient(patientData)).then(() => {
      setOpenSnackbar(true);
    });
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
        Add Patient
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Patient"}
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Patient added successfully!
        </Alert>
      </Snackbar>
      {isError && (
        <Snackbar open autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default AddPatient;
