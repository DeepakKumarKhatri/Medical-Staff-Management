import React from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Grid,
  Typography,
} from "@mui/material";
import StatusDropdown from "../Dropdown/StatusDropdown";

const PatientCard = ({ patient }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 2,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Avatar
          alt={`${patient.firstName} ${patient.lastName}`}
          src={patient.avatar}
          sx={{ width: 100, height: 100 }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom className="text-center">
          {patient.firstName} {patient.lastName}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Patient Credentials
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>ID:</strong> {patient.userId}
        </Typography>
      </CardContent>
      <Box sx={{ textAlign: "center" }}>
        <StatusDropdown diseases={patient.diseases} patientId={patient}/>
      </Box>
    </Card>
  );
};

const PatientGrid = ({ patients }) => {
  return (
    <Grid container spacing={3}>
      {patients.map((patient, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <PatientCard patient={patient} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PatientGrid;
