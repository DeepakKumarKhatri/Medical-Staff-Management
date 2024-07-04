import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";

const PatientHelp = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.message) {
      setError("All fields are required.");
      return;
    }

    console.log(formData);
    setSubmitted(true);
    setError("");
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Feedback / Complaint Form
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="subject"
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="message"
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {submitted && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Your feedback has been submitted!
            </Alert>
          )}
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
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PatientHelp;
