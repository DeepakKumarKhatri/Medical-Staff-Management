import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import { userLogin } from "../authSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, data, isError } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({ userId: "", password: "" });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    if (data && data.message === "User Found") {
      setSnackbar({
        open: true,
        message: "Login successful",
        severity: "success",
      });

      if (data.data.systemAccess.userRole === "patient") {
        navigate("/patient/treatments");
      } else if (data.data.systemAccess.userRole === "doctor") {
        navigate("/doctor/patient-records");
      } else if (data.data.systemAccess.userRole === "clinic_manager") {
        navigate("/clinic_manager/doctors");
      }
    } else if (isError) {
      setSnackbar({
        open: true,
        message: "Invalid credentials",
        severity: "error",
      });
    }
  }, [data, isError, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(userLogin(userData));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Your ID"
          name="userId"
          autoComplete="email"
          autoFocus
          onChange={handleChange}
          value={userData.userId}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleChange}
          value={userData.password}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "#F4A261",
            "&:hover": { backgroundColor: "#E76F51" },
          }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Sign In"}
        </Button>
        <Grid container>
          <Grid item>
            <div className="flex gap-1">
              <p className="font-bold">Don't have an account?</p>
              <Link
                to={"/register"}
                className="text-blue-600 font-bold underline underline-offset-6"
              >
                Sign Up
              </Link>
            </div>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
