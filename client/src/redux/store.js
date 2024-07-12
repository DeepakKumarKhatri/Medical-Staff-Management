import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/Auth/authSlice";
import manageUsersReducer from "../screens/ManageUsers/manageUsersSlice";
import clinicManagerUsersReducer from "../components/ClinicManagerUsers/clinicManagerUsersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    manageUsers: manageUsersReducer,
    clinicManagerUsers: clinicManagerUsersReducer,
  },
});
