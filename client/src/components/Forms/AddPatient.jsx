import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Add as AddIcon, FileCopy as FileCopyIcon } from "@mui/icons-material";
import { generateUniqueId, generatePassword } from "../../lib/doctor_helpers";
import { useDispatch, useSelector } from "react-redux";
import { addPatient } from "../../screens/DoctorPatients/doctorSlice";
import ImageInput from "../Generals/ImageInput";

const AddPatient = () => {
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    profileImage: "",
    diseases: [{ title: "", description: "", instruction: "" }],
    gender: "",
    notes: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const [generatedCredentials, setGeneratedCredentials] = useState({
    patientId: "",
    password: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const { isLoading, isError, errorMessage } = useSelector(
    (state) => state.clinicManagerUsers
  );

  const handleChange = (field, value) => {
    setPatientData({ ...patientData, [field]: value });
  };

  const handleDiseaseChange = (index, field, value) => {
    const newDiseases = [...patientData.diseases];
    newDiseases[index][field] = value;
    setPatientData({ ...patientData, diseases: newDiseases });
  };

  const handleAddDisease = () => {
    setPatientData({
      ...patientData,
      diseases: [
        ...patientData.diseases,
        { title: "", description: "", instruction: "" },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = generateUniqueId(patientData.firstName, patientData.lastName);
    const pass = generatePassword(patientData.firstName, patientData.lastName);
    setGeneratedCredentials({ patientId: id, password: pass });
    const diagnosedBy = getDoctorStuff();
    const data = { ...patientData, id, pass, diagnosedBy };
    dispatch(addPatient(data)).then(() => {
      setOpenSnackbar(true);
    });
  };

  const getDoctorStuff = () => {
    return {
      doctorName:
        currentUser?.user?.user?.firstName ||
        currentUser?.firstName + " " + currentUser?.user?.user?.lastName ||
        currentUser?.lastName,
      doctorId: currentUser?.id,
    };
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
          bgcolor: "background.paper",
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
              <ImageInput
                profileImage={profileImage}
                setProfileImage={(image) => {
                  setProfileImage(image);
                  handleChange("profileImage", image);
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel id="gender-select-label">Gender</InputLabel>
              <Select
                labelId="gender-select-label"
                id="gender-select"
                value={patientData.gender}
                label="Gender"
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {patientData.diseases.map((disease, index) => (
            <Box key={index} sx={{ mt: 2, mb: 2 }}>
              <TextField
                fullWidth
                label={`Disease ${index + 1} Title`}
                value={disease.title}
                onChange={(e) =>
                  handleDiseaseChange(index, "title", e.target.value)
                }
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label={`Disease ${index + 1} Description`}
                value={disease.description}
                onChange={(e) =>
                  handleDiseaseChange(index, "description", e.target.value)
                }
                variant="outlined"
                margin="normal"
                multiline
                rows={2}
              />
              <TextField
                fullWidth
                label={`Instruction for Disease ${index + 1}`}
                value={disease.instruction}
                onChange={(e) =>
                  handleDiseaseChange(index, "instruction", e.target.value)
                }
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
          <TextField
            fullWidth
            label="Additional Notes"
            value={patientData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ m: 2 }}
          >
            {isLoading ? "Adding Patient..." : "Add Patient"}
          </Button>
        </form>
        {generatedCredentials.patientId && (
          <Box
            mt={4}
            p={2}
            bgcolor="background.paper"
            borderRadius={2}
            boxShadow={1}
          >
            <Typography variant="h6" gutterBottom>
              Here are your generated credentials for future usage:
            </Typography>
            <Typography>
              <strong>ID:</strong> {generatedCredentials.patientId}
            </Typography>
            <Typography>
              <strong>Password:</strong> {generatedCredentials.password}
            </Typography>
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
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Credentials copied to clipboard!
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
    </Container>
  );
};

export default AddPatient;
