import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/Auth/authSlice";
import manageUsersReducer from "../screens/ManageUsers/manageUsersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    manageUsers: manageUsersReducer,
  },
});
