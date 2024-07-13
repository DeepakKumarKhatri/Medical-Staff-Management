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
import { PDFDocument, rgb } from "pdf-lib";

const ReportCard = ({ patient }) => {
  const handleDownloadClick = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]); 
    const { width, height } = page.getSize();
  
    const imageUrl = patient.avatar ;
  
    // Check if the image is a PNG
    let image;
    if (imageUrl.endsWith('.png')) {
      try {
        const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());
        image = await pdfDoc.embedPng(imageBytes);
      } catch (error) {
        console.error("Image embed error:", error);
        image = null;
      }
    } else {
      image = null;
    }
  
    page.drawText('Medico Patient Report', {
      x: 50,
      y: height - 50,
      size: 24,
      color: rgb(0, 0, 0),
    });
  
    if (image) {
      const imageDims = image.scale(0.15);
      page.drawImage(image, {
        x: width - imageDims.width - 30, 
        y: height - imageDims.height - 30, 
        width: imageDims.width,
        height: imageDims.height,
      });
    }
  
    page.drawText(`Name: ${patient.firstName} ${patient.lastName}`, {
      x: 50,
      y: height - 180,
      size: 18,
      color: rgb(0, 0, 0),
    });
  
    page.drawText(`Gender: ${patient.gender}`, {
      x: 50,
      y: height - 210,
      size: 18,
      color: rgb(0, 0, 0),
    });
  
    page.drawText(`Contact: ${patient.contact}`, {
      x: 50,
      y: height - 240,
      size: 18,
      color: rgb(0, 0, 0),
    });
  
    page.drawText(`User ID: ${truncateId(patient.userId)}`, {
      x: 50,
      y: height - 270,
      size: 18,
      color: rgb(0, 0, 0),
    });
  
    page.drawText(`Status: ${patient.status}`, {
      x: 50,
      y: height - 300,
      size: 18,
      color: rgb(0, 0, 0),
    });
  
    page.drawText('Diseases:', {
      x: 50,
      y: height - 350,
      size: 20,
      color: rgb(0, 0, 0),
    });
    
    let currentY = height - 380;
    patient.diseases.forEach(disease => {
      page.drawText(`• ${disease.title}: ${disease.description}`, {
        x: 50,
        y: currentY,
        size: 16,
        color: rgb(0, 0, 0),
      });
      currentY -= 20;
    });
  
    page.drawText('Submissions:', {
      x: 50,
      y: currentY - 20,
      size: 20,
      color: rgb(0, 0, 0),
    });
  
    currentY -= 50;
    patient.submissions.forEach(submission => {
      page.drawText(`• Subject: ${submission.subject}`, {
        x: 50,
        y: currentY,
        size: 16,
        color: rgb(0, 0, 0),
      });
      page.drawText(`  Message: ${submission.message}`, {
        x: 50,
        y: currentY - 20,
        size: 14,
        color: rgb(0, 0, 0),
      });
      currentY -= 40;
    });
  
    page.drawText('© 2024 Medico, All rights reserved.', {
      x: 50,
      y: 30,
      size: 12,
      color: rgb(0, 0, 0),
    });
  
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = `${patient.firstName}_${patient.lastName}_Report.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    URL.revokeObjectURL(url);
  };
  

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
              onClick={handleDownloadClick}
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
