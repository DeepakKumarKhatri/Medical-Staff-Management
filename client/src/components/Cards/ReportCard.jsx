import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Avatar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Download } from "lucide-react";

const ReportCard = ({ patient }) => {
  return (
    <Card
      sx={{
        maxWidth: 250,
        margin: 2,
        boxShadow: 3,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <CardContent>
        <Avatar
          alt={patient.name}
          src={patient.photo}
          sx={{ width: 64, height: 64, margin: "0 auto 8px" }}
        />
        <Typography variant="h6" gutterBottom>
          {patient.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          ID: {patient.id}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          <IconButton
            sx={{
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.2)" },
            }}
          >
            <Download />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

const PatientReports = ({ patients }) => {
  return (
    <Grid container justifyContent="center">
      {patients.map((patient) => (
        <Grid item key={patient.id} xs={12} sm={6} md={3}>
          <ReportCard patient={patient} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PatientReports;
