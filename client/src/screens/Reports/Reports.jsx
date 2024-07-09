import React from "react";
import PatientReports from "../../components/Cards/ReportCard";
import Header from "../../components/Generals/Header";

const patients = [
  {
    id: "123",
    name: "John Doe",
    photo: "https://example.com/photo1.jpg",
  },
  {
    id: "456",
    name: "Jane Smith",
    photo: "https://example.com/photo2.jpg",
  },
  {
    id: "789",
    name: "Alice Johnson",
    photo: "https://example.com/photo3.jpg",
  },
  {
    id: "101",
    name: "Bob Brown",
    photo: "https://example.com/photo4.jpg",
  },
];
const Reports = () => {
  return (
    <div className="flex flex-col m-4">
      <Header
        main_content={"AVAILABLE REPORTS"}
        para_content={
          "Following are the reports of the patients that have been diagnosed under Medico."
        }
      />
      <PatientReports patients={patients} />
    </div>
  );
};

export default Reports;
