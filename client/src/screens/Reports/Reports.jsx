import React, { useEffect } from "react";
import PatientReports from "../../components/Cards/ReportCard";
import Header from "../../components/Generals/Header";
import { getPatients } from "../ManageUsers/manageUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";

const Reports = () => {
  const dispatch = useDispatch();
  const { patients, isLoading, isError, errorMessage } = useSelector(
    (state) => state.manageUsers
  );

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]); 
  
  return (
    <div className="flex flex-col m-4">
      <Header
        main_content={"AVAILABLE REPORTS"}
        para_content={
          "Following are the reports of the patients that have been diagnosed under Medico."
        }
      />
      {isLoading ? (
        <Typography variant="h6" textAlign="center">
          Loading...
        </Typography>
      ) : isError ? (
        <Typography variant="h6" textAlign="center" color="error">
          {errorMessage}
        </Typography>
      ) : patients.length === 0 ? (
        <Typography variant="h6" textAlign="center">
          No patient reports available.
        </Typography>
      ) : (
        <PatientReports patients={patients.patients} />
      )}
    </div>
  );
};

export default Reports;
