import React, { useState, useEffect } from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import FeedbackCard from "../../components/Cards/FeedbackCard";
import Header from "../../components/Generals/Header";
import { useDispatch, useSelector } from "react-redux";
import { getFeedback } from "./feedbackSlice";

const Feedback = ({ comingFrom }) => {
  const dispatch = useDispatch();
  const { isLoading, isError, doctorsFeedback, patientsFeedback, errorMessage } = useSelector(state => state.feedback);
  const [filter, setFilter] = useState("feedback");

  useEffect(() => {
    dispatch(getFeedback());
  }, [dispatch]);

  const feedbackData = comingFrom === "doctor" ? doctorsFeedback : patientsFeedback;

  const filteredData = feedbackData.map(user => ({
    ...user,
    submissions: user.submissions.filter(sub => sub.ofType === filter)
  })).filter(user => user.submissions.length > 0);

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const headerContent = {
    main: comingFrom === "doctor"
      ? `DOCTOR'S ${filter.toUpperCase()}`
      : `PATIENTS' ${filter.toUpperCase()}`,
    para: comingFrom === "doctor"
      ? `Following are the ${filter} received from different doctors.`
      : `Following are the ${filter} received from different patients.`,
  };

  return (
    <Container>
      <Header
        main_content={headerContent.main}
        para_content={headerContent.para}
      />
      <Box display="flex" justifyContent="center" mb={2}>
        <Button
          variant={filter === "feedback" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("feedback")}
          sx={{ mr: 2 }}
        >
          Feedback
        </Button>
        <Button
          variant={filter === "complaint" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("complaint")}
        >
          Complaints
        </Button>
      </Box>
      {isLoading ? (
        <Typography variant="h6" textAlign="center">
          Loading...
        </Typography>
      ) : isError ? (
        <Typography variant="h6" textAlign="center" color="error">
          {errorMessage}
        </Typography>
      ) : filteredData.length === 0 ? (
        <Typography variant="h6" textAlign="center">
          No {filter} available.
        </Typography>
      ) : (
        filteredData.map((user, index) =>
          user.submissions.map((submission, subIndex) => (
            <FeedbackCard
              key={`${index}-${subIndex}`}
              feedback={{
                userName: `${user.firstName} ${user.lastName}`,
                userImage: user.avatar,
                subject: submission.subject,
                message: submission.message,
                messageType: submission.ofType,
                rating: submission.stars || null,
              }}
            />
          ))
        )
      )}
    </Container>
  );
};

export default Feedback;
