import React, { useEffect, useState } from "react";
import {
  Avatar,
  TextField,
  Box,
  Grid,
  Typography,
  Button,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ImageInput from "../../components/Generals/ImageInput";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../DoctorPatients/doctorSlice";

const DoctorProfile = ({ comingFrom }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    yearsOfExperience: 10,
    id: "",
    password: "",
    profileImage: "",
    department: "",
    gender: "",
    originalID: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (comingFrom === "profile" && currentUser) {
      console.log(currentUser);
      setFormValues({
        firstName: currentUser?.user?.user?.firstName || currentUser?.firstName,
        lastName: currentUser?.user?.user?.lastName || currentUser?.lastName,
        yearsOfExperience: currentUser?.user?.user?.yearsOfExperience,
        id: currentUser?.userId,
        profileImage: currentUser?.user?.user?.avatar || currentUser?.avatar,
        department: currentUser?.user?.user?.department || "",
        gender: currentUser?.user?.user?.gender || "",
        originalID: currentUser?.userId,
      });
    }
  }, [comingFrom, currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const { originalID, ...updatedData } = formValues; // Exclude originalID
    console.log("User Data:", { ...updatedData, originalID });
    dispatch(updateProfile({ ...updatedData, originalID })).then(() => {
      setOpenSnackbar(true);
    });
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
              <FormControl sx={{ minWidth: 250 }}>
                <InputLabel id="department-select-label">Department</InputLabel>
                <Select
                  labelId="department-select-label"
                  id="department-select"
                  name="department"
                  value={formValues.department}
                  label="Department"
                  onChange={handleInputChange}
                  disabled={comingFrom === "profile"}
                >
                  <MenuItem value="Cardiology">Cardiology</MenuItem>
                  <MenuItem value="Neurology">Neurology</MenuItem>
                  <MenuItem value="Orthopedics">Orthopedics</MenuItem>
                  <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                  <MenuItem value="General Medicine">General Medicine</MenuItem>
                </Select>
              </FormControl>
            </Grid>
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
          </Grid>
        </Grid>
        <Grid item sx={{ textAlign: "center" }}>
          {comingFrom === "edit-profile" ? (
            <ImageInput
              profileImage={formValues.profileImage}
              setProfileImage={(url) =>
                setFormValues((prev) => ({ ...prev, profileImage: url }))
              }
            />
          ) : (
            <Avatar
              alt="Doctor Profile"
              src={formValues.profileImage}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
          )}
          <FormControl sx={{ m: 1, minWidth: 100 }}>
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              name="gender"
              value={formValues.gender}
              label="Gender"
              onChange={handleInputChange}
              disabled={comingFrom === "profile"}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
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
