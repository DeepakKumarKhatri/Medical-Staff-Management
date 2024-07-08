import React, { useState } from 'react';
import { MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import AddClinicManager from '../../components/ClinicManagerUsers/AddClinicManager';
import AddDoctor from '../../components/ClinicManagerUsers/AddDoctor';
import AddPatient from '../../components/ClinicManagerUsers/AddPatient';

const UserSelectionForm = () => {
  const [userType, setUserType] = useState('');

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  const renderForm = () => {
    switch (userType) {
      case 'Doctor':
        return <AddDoctor />;
      case 'Patient':
        return <AddPatient />;
      case 'Clinic Manager':
        return <AddClinicManager />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ m: 4 }}>
      <FormControl fullWidth>
        <InputLabel id="user-type-label">Select User Type</InputLabel>
        <Select
          labelId="user-type-label"
          id="user-type-select"
          value={userType}
          label="Select User Type"
          onChange={handleChange}
        >
          <MenuItem value="Doctor">Doctor</MenuItem>
          <MenuItem value="Patient">Patient</MenuItem>
          <MenuItem value="Clinic Manager">Clinic Manager</MenuItem>
        </Select>
      </FormControl>
      {renderForm()}
    </Box>
  );
};

export default UserSelectionForm;
