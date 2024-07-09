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

const FeedbackCard = ({ feedback }) => {
  const handleDownloadClick = () => {
    console.log("Generating PDF for feedback:", feedback);
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
            {feedback.messageType === "Feedback" && (
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
