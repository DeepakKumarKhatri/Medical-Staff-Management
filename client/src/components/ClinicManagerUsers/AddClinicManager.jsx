import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

const AddClinicManager = () => {
  // Add state and handlers for Clinic Manager form fields

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom className="text-blue-900 mb-2">
        Add Clinic Manager
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField required label="First Name" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required label="Last Name" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required label="Email" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required label="ID" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required label="Password" type="password" fullWidth />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Add Clinic Manager
      </Button>
    </Box>
  );
};

export default AddClinicManager;
