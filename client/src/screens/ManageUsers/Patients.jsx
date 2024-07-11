import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatients } from "./manageUsersSlice";
import ManagerUsers from "../../components/Cards/ManagerUsers";
import Header from "../../components/Generals/Header";
import SkeletonTable from "../../components/Skeletons/SkeletonTable";

const Patients = () => {

  const dispatch = useDispatch();
  const { patients, isLoading, isError, errorMessage } = useSelector(
    (state) => state.manageUsers
  );

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  return (
    <div className="flex flex-col m-5">
      <Header
        main_content={"MANAGE PATIENTS"}
        para_content={"List of all patients that had been diagnosed at Medico."}
      />
      <>
        {isLoading ? (
          <SkeletonTable />
        ) : isError ? (
          <p>{errorMessage}</p>
        ) : (
          <ManagerUsers comingFrom={"patient"} data={patients} />
        )}
      </>
    </div>
  );
};

export default Patients;
