import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { useState } from "react";

export default function PatientProfile({ comingFrom }) {
  const [profileImage, setProfileImage] = useState(null);
  const [isEditable] = useState(comingFrom === "edit-profile");
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ m: 1, bgcolor: "secondary.main", width: 100, height: 100 }}
          src={profileImage}
        />
        {isEditable && (
          <Button variant="contained" component="label" sx={{ mt: 2, mb: 2 }}>
            Change Avatar
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
        )}
        <Typography component="h1" variant="h5">
          {isEditable ? "Edit Profile" : "Profile"}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {isEditable ? (
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                />
              ) : (
                <Typography variant="body1">
                  <strong>First Name: </strong> {formData.firstName}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {isEditable ? (
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              ) : (
                <Typography variant="body1">
                  <strong>Last Name: </strong> {formData.lastName}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {isEditable ? (
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              ) : (
                <Typography variant="body1">
                  <strong>Email: </strong> {formData.email}
                </Typography>
              )}
            </Grid>
            {isEditable && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            )}
          </Grid>
          {isEditable && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Profile
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}
