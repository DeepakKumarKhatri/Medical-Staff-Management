import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export default function PatientProfile() {
  const currentUser = useSelector((state) => state.auth.user);
  const shortAccess = currentUser?.user?.user;
  const userData = {
    firstName: currentUser?.firstName || shortAccess?.firstName,
    lastName: currentUser?.lastName || shortAccess?.lastName,
    userId: currentUser?.userId || shortAccess?.userId,
    gender: currentUser?.gender || shortAccess?.gender,
    avatar: currentUser?.avatar || shortAccess?.avatar,
    status: currentUser?.status || shortAccess?.status,
    lastChecked: currentUser?.updatedAt || shortAccess?.updatedAt,
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
          src={userData.avatar}
        />
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>First Name: </strong> {userData.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Last Name: </strong> {userData.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>User ID: </strong> {userData.userId}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Gender: </strong> {userData.gender}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Status: </strong> {userData.status}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Last Checked: </strong>{" "}
                {new Date(userData.lastChecked).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
