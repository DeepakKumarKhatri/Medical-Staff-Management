import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Download } from "lucide-react";
import { truncateId } from "../../lib/truncateId";

const ReportCard = ({ patient }) => {
  return (
    <Card
      sx={{
        maxWidth: 250,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Avatar
          alt={`${patient.firstName} ${patient.lastName}`}
          src={patient.avatar}
          sx={{ width: 64, height: 64, margin: "0 auto 8px" }}
        />
        <div className="flex justify-between">
          <div className="flex flex-col">
            <Typography variant="h6">{`${patient.firstName} ${patient.lastName}`}</Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="text-left"
            >
              ID: {truncateId(patient.userId)}
            </Typography>
          </div>
          <Tooltip title="Download PDF">
            <IconButton
              sx={{
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.1)" },
              }}
            >
              <Download />
            </IconButton>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
};

const PatientReports = ({ patients }) => {
  return (
    <Grid container justifyContent="center">
      {patients.map((patient) => (
        <Grid item key={patient._id} xs={12} sm={6} md={3}>
          <ReportCard patient={patient} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PatientReports;
