import React, { useEffect } from "react";
import SearchBox from "../SearchBox/SearchBox";
import RecordCard from "./RecordCard";
import { useDispatch, useSelector } from "react-redux";
import { getPatients } from "../../screens/DoctorPatients/doctorSlice";

const MedicalRecords = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const doctorId = currentUser?.id;

  useEffect(() => {
    if (doctorId) {
      dispatch(getPatients(doctorId));
    }
  }, [doctorId, dispatch]);

  const recordsData = useSelector((state) => state.doctor.patients);
  const isLoading = useSelector((state) => state.doctor.isLoading);
  const isError = useSelector((state) => state.doctor.isError);
  const errorMessage = useSelector((state) => state.doctor.errorMessage);

  return (
    <div className="flex flex-col p-4">
      <SearchBox />
      <RecordCard records={recordsData} />
    </div>
  );
};

export default MedicalRecords;
