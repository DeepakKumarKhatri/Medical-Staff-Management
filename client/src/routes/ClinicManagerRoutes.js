import SidebarLayout from "../components/Layouts/SidebarLayout";
import ClinicManagerProfile from "../screens/ClinicManagerProfile/ClinicManagerProfile";
import Feedback from "../screens/Feedbacks/Feedback";
import Clinic_Managers from "../screens/ManageUsers/Clinic_Managers";
import Doctors from "../screens/ManageUsers/Doctors";
import Patients from "../screens/ManageUsers/Patients";
import NotFound from "../screens/NotFound/NotFound";
import ClinicManagerSidebar from "../components/ClinicManagerSidebar/ClinicManagerSidebar";
import Reports from "../screens/Reports/Reports";
import UserSelectionForm from "../screens/ManageUsers/UserSelectionForm";

export const clinic_manager_routes = {
  path: "/clinic_manager",
  element: (
    <SidebarLayout>
      <ClinicManagerSidebar />
    </SidebarLayout>
  ),
  errorElement: <NotFound />,
  children: [
    {
      path: "doctors",
      element: <Doctors />,
    },
    {
      path: "patients",
      element: <Patients />,
    },
    {
      path: "managers",
      element: <Clinic_Managers />,
    },
    {
      path: "feedbacks_doctor",
      element: <Feedback comingFrom={"doctor"} />,
    },
    {
      path: "feedbacks_patients",
      element: <Feedback comingFrom={"patients"} />,
    },
    {
      path: "profile",
      element: <ClinicManagerProfile comingFrom={"profile"} />,
    },
    {
      path: "edit-profile",
      element: <ClinicManagerProfile comingFrom={"edit-profile"} />,
    },
    {
      path: "reports",
      element: <Reports />,
    },
    {
      path: "add_user",
      element: <UserSelectionForm />,
    },
  ],
};
