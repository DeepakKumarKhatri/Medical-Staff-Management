import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClinicManagers } from "./manageUsersSlice";
import ManagerUsers from "../../components/Cards/ManagerUsers";
import Header from "../../components/Generals/Header";
import SkeletonTable from "../../components/Skeletons/SkeletonTable";

const Clinic_Managers = () => {
  const dispatch = useDispatch();
  const { clinicManagers, isLoading, isError, errorMessage } = useSelector(
    (state) => state.manageUsers
  );

  useEffect(() => {
    dispatch(getClinicManagers());
  }, [dispatch]);

  return (
    <div className="flex flex-col m-5">
      <Header
        main_content={"MANAGE CLINIC MANAGERS"}
        para_content={
          "List of all available working clinic managers at Medico."
        }
      />
      <>
        {isLoading ? (
          <SkeletonTable />
        ) : isError ? (
          <p>{errorMessage}</p>
        ) : (
          <ManagerUsers comingFrom={"clinic_manager"} data={clinicManagers} />
        )}
      </>
    </div>
  );
};

export default Clinic_Managers;
