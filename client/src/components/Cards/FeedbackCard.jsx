import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
  Rating,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Download } from "lucide-react";
import { labels } from "../../constants/RatingLabels";
import { PDFDocument, rgb } from "pdf-lib";

const FeedbackCard = ({ feedback }) => {
  const handleDownloadClick = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    const { width, height } = page.getSize();

    const imageUrl = feedback.userImage;

    let image;
    if (imageUrl.endsWith(".png")) {
      try {
        const imageBytes = await fetch(imageUrl).then((res) =>
          res.arrayBuffer()
        );
        image = await pdfDoc.embedPng(imageBytes);
      } catch (error) {
        console.error("Image embed error:", error);
        image = null;
      }
    } else {
      image = null;
    }

    page.drawText("Medico Feedback Report", {
      x: 50,
      y: height - 30,
      size: 24,
      color: rgb(0, 0, 0),
    });

    if (image) {
      const imageDims = image.scale(0.5);
      page.drawImage(image, {
        x: width / 2 - imageDims.width / 2,
        y: height - imageDims.height - 60,
        width: imageDims.width,
        height: imageDims.height,
      });
    }

    page.drawText(`Name: ${feedback.userName}`, {
      x: 50,
      y: height - 150,
      size: 18,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Role: ${feedback.userRole}`, {
      x: 50,
      y: height - 180,
      size: 18,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Subject: ${feedback.subject}`, {
      x: 50,
      y: height - 210,
      size: 18,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Description: ${feedback.message}`, {
      x: 50,
      y: height - 240,
      size: 18,
      color: rgb(0, 0, 0),
    });

    if (feedback.messageType === "feedback" && feedback.rating !== null) {
      page.drawText(`Rating: ${labels[feedback.rating]}`, {
        x: 50,
        y: height - 270,
        size: 18,
        color: rgb(0, 0, 0),
      });
    }

    page.drawText("© 2024 Medico, All rights reserved.", {
      x: 50,
      y: 30,
      size: 12,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `feedback_${feedback.userName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <Card
      sx={{ maxWidth: 600, margin: "16px auto", boxShadow: 3, borderRadius: 2 }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2} sx={{ textAlign: "center" }}>
            <Avatar
              alt={feedback.userName}
              src={feedback.userImage}
              sx={{ width: 64, height: 64, mb: 2, mx: "auto" }}
            />
            <Typography variant="body2">{feedback.userName}</Typography>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Typography variant="h6" gutterBottom>
              {feedback.subject}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {feedback.message}
            </Typography>
            {feedback.messageType === "feedback" &&
              feedback.rating !== null && (
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Rating
                    name="rating"
                    value={feedback.rating}
                    readOnly
                    getLabelText={(value) => labels[value]}
                    IconContainerComponent={(props) => {
                      const { value, ...other } = props;
                      return (
                        <Tooltip title={labels[value]} arrow>
                          <span {...other} />
                        </Tooltip>
                      );
                    }}
                  />
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {labels[feedback.rating]}
                  </Typography>
                </Box>
              )}
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "right" }}>
            <Tooltip title="Download PDF">
              <IconButton
                onClick={handleDownloadClick}
                sx={{
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
              >
                <Download size={24} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
