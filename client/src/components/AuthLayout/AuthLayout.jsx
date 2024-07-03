import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextBackground from "../TextBackground/TextBackground";
import SignInSide from "../SignUp/SignInSide";

export default function AuthLayout() {

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}>
        <TextBackground />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <SignInSide/>
      </Grid>
    </Grid>
  );
}
