import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import DepartmentDropdown from '../../components/Dropdown/DepartmentDropdown';
import GenderDropdown from '../../components/Dropdown/GenderDropdown';
import CredentialsGenerator from '../Generals/CredentialsGenerator';
import ImageInput from '../Generals/ImageInput';

const AddDoctor = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleUpdate = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ m: 4, p: 4, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
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
          <DepartmentDropdown />
        </Grid>
        <Grid item xs={12} sm={4}>
          <GenderDropdown />
        </Grid>
        <Grid item xs={12}>
          <CredentialsGenerator />
        </Grid>
        <Grid item xs={12}>
          <ImageInput profileImage={profileImage} setProfileImage={setProfileImage} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Add Doctor
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Doctor added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddDoctor;
