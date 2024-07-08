import SidebarLayout from "../components/Layouts/SidebarLayout";
import ClinicManagerProfile from "../screens/ClinicManagerProfile/ClinicManagerProfile";
import AddDoctor from "../screens/ClinicManagerUsers/AddDoctor";
import AddClinicManager from "../screens/ClinicManagerUsers/AddClinicManager";
import Feedback from "../screens/Feedbacks/Feedback";
import Clinic_Managers from "../screens/ManageUsers/Clinic_Managers";
import Doctors from "../screens/ManageUsers/Doctors";
import Patients from "../screens/ManageUsers/Patients";
import NotFound from "../screens/NotFound/NotFound";
import AddPatient from "../screens/ClinicManagerUsers/AddPatient";
import ClinicManagerSidebar from "../components/ClinicManagerSidebar/ClinicManagerSidebar";
import Reports from "../screens/Reports/Reports";

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
      path: "add-doctor",
      element: <AddDoctor comingFrom={"add-doctor"} />,
    },
    {
      path: "add-manager",
      element: <AddClinicManager comingFrom={"add-manager"} />,
    },
    {
      path: "add-patient",
      element: <AddPatient comingFrom={"add-patient"} />,
    },
    {
      path: "update-doctor",
      element: <AddDoctor comingFrom={"update-doctor"} />,
    },
    {
      path: "update-manager",
      element: <AddClinicManager comingFrom={"update-manager"} />,
    },
    {
      path: "update-patient",
      element: <AddPatient comingFrom={"update-patient"} />,
    },
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
  ],
};
