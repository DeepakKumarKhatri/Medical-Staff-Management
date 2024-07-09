import React from "react";
import { Container } from "@mui/material";
import FeedbackCard from "../../components/Cards/FeedbackCard";
import Header from "../../components/Generals/Header";

const feedbackData = [
  {
    userName: "John Doe",
    userImage: "https://via.placeholder.com/150",
    subject: "Great Service",
    message: "I had a wonderful experience with the new system!",
    messageType: "Feedback",
    rating: 5,
  },
  {
    userName: "Jane Smith",
    userImage: "https://via.placeholder.com/150",
    subject: "Needs Improvement",
    message: "The system is good but can be improved in several areas.",
    messageType: "Feedback",
    rating: 3,
  },
  {
    userName: "Alice Johnson",
    userImage: "https://via.placeholder.com/150",
    subject: "Complaint about delay",
    message: "The system was slow and unresponsive at times.",
    messageType: "Complaint",
  },
];

const Feedback = ({ comingFrom }) => {
  return (
    <Container>
      <Header
        main_content={
          comingFrom === "doctor" ? "DOCTOR'S FEEDBACK" : "PATIENTS'S FEEDBACK"
        }
        para_content={
          comingFrom === "doctor"
            ? "Following are the feedbacks recieved from different doctors."
            : "Following are the feedbacks recieved from different patients."
        }
      />
      {feedbackData.map((feedback, index) => (
        <FeedbackCard key={index} feedback={feedback} />
      ))}
    </Container>
  );
};

export default Feedback;
