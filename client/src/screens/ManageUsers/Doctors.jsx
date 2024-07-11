import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "./manageUsersSlice";
import ManagerUsers from "../../components/Cards/ManagerUsers";
import Header from "../../components/Generals/Header";
import SkeletonTable from "../../components/Skeletons/SkeletonTable";

const Doctors = () => {
  const dispatch = useDispatch();
  const { doctors, isLoading, isError, errorMessage } = useSelector(
    (state) => state.manageUsers
  );

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  return (
    <div className="flex flex-col m-5">
      <Header
        main_content={"MANAGE DOCTORS"}
        para_content={"List of all available working doctors at Medico."}
      />
      <>
        {isLoading ? (
          <SkeletonTable />
        ) : isError ? (
          <p>{errorMessage}</p>
        ) : (
          <ManagerUsers comingFrom={"doctor"} data={doctors} />
        )}
      </>
    </div>
  );
};

export default Doctors;
