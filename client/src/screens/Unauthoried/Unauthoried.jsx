import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Unauthorized Access
      </Typography>
      <Typography variant="body1" align="center" sx={{ maxWidth: 600 }}>
        You are not authorized to view this page. Please contact your
        administrator for assistance.
      </Typography>
      <Box mt={4}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary" component={Link} to="/">
              Go Back
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Unauthorized;
