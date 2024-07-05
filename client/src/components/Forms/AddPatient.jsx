import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  IconButton,
  Avatar,
  Snackbar,
  Alert
} from "@mui/material";
import { Add as AddIcon, FileCopy as FileCopyIcon } from "@mui/icons-material";
import { generateUniqueId, generatePassword } from "../../lib/doctor_helpers";

const AddPatient = () => {
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    profileImage: null,
    diseases: [],
    instructions: []
  });
  const [generatedCredentials, setGeneratedCredentials] = useState({
    patientId: "",
    password: ""
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (field, value) => {
    setPatientData({ ...patientData, [field]: value });
  };

  const handleAddDisease = () => {
    setPatientData({
      ...patientData,
      diseases: [...patientData.diseases, ""],
      instructions: [...patientData.instructions, ""]
    });
  };

  const handleDiseaseChange = (index, value) => {
    const newDiseases = [...patientData.diseases];
    newDiseases[index] = value;
    setPatientData({ ...patientData, diseases: newDiseases });
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...patientData.instructions];
    newInstructions[index] = value;
    setPatientData({ ...patientData, instructions: newInstructions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = generateUniqueId(patientData.firstName, patientData.lastName);
    const pass = generatePassword(patientData.firstName, patientData.lastName);
    setGeneratedCredentials({ patientId: id, password: pass });
    // Logic to save the patient data to the database
    console.log({ ...patientData, id, pass });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPatientData({ ...patientData, profileImage: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleCopyCredentials = () => {
    const credentials = `ID: ${generatedCredentials.patientId}\nPassword: ${generatedCredentials.password}`;
    navigator.clipboard.writeText(credentials);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          boxShadow: 3,
          borderRadius: 2,
          mt: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add a Patient
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="First Name"
                value={patientData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Last Name"
                value={patientData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="profile-image-upload">
                <IconButton component="span">
                  <Avatar
                    src={patientData.profileImage}
                    sx={{ width: 56, height: 56 }}
                  />
                </IconButton>
              </label>
            </Grid>
          </Grid>
          {patientData.diseases.map((disease, index) => (
            <Box key={index} sx={{ mt: 2, mb: 2 }}>
              <TextField
                fullWidth
                label={`Disease ${index + 1}`}
                value={disease}
                onChange={(e) => handleDiseaseChange(index, e.target.value)}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label={`Instruction for Disease ${index + 1}`}
                value={patientData.instructions[index]}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                variant="outlined"
                margin="normal"
                multiline
                rows={2}
              />
            </Box>
          ))}
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddDisease}
            sx={{ mt: 2, mb: 2 }}
          >
            Add Disease
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ m: 2 }}
          >
            Add Patient
          </Button>
        </form>
        {generatedCredentials.patientId && (
          <Box mt={4} p={2} bgcolor="background.paper" borderRadius={2} boxShadow={1}>
            <Typography variant="h6" gutterBottom>
              Here are your generated credentials for future usage:
            </Typography>
            <Typography><strong>ID:</strong> {generatedCredentials.patientId}</Typography>
            <Typography><strong>Password:</strong> {generatedCredentials.password}</Typography>
            <Button
              variant="outlined"
              startIcon={<FileCopyIcon />}
              onClick={handleCopyCredentials}
              sx={{ mt: 2 }}
            >
              Copy to Clipboard
            </Button>
          </Box>
        )}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Credentials copied to clipboard!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default AddPatient;
