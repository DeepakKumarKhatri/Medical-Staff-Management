import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import ImageInput from "../../components/Generals/ImageInput";

const ClinicManagerProfile = ({ comingFrom }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
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

  const isReadOnly = comingFrom === "profile";

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
        PROFILE
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="First Name"
            variant="standard"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isReadOnly}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Last Name"
            variant="standard"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isReadOnly}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField label="ID" value="ID" disabled={isReadOnly} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            value="PASSWORD"
            disabled={isReadOnly}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Box alignItems="center">
            <Avatar
              alt="User Profile"
              src={profileImage}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            {comingFrom !== "profile" && (
              <Button variant="outlined" component="label">
                Change Image
                <input
                  type="file"
                  hidden
                  disabled={isReadOnly}
                  onChange={handleImageChange}
                />
              </Button>
            )}
          </Box>
        </Grid>
        {comingFrom === "edit-profile" && (
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update
            </Button>
          </Grid>
        )}
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClinicManagerProfile;
