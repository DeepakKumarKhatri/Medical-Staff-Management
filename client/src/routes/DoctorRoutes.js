import DoctorSidebarCaller from "../components/DoctorSidebar/DoctorSidebar";
import AddPatient from "../components/Forms/AddPatient";
import SidebarLayout from "../components/Layouts/SidebarLayout";
import PatientRecordDetail from "../components/MedicalRecords/PatientRecordDetail";
import DoctorPatients from "../screens/DoctorPatients/DoctorPatients";
import DoctorProfile from "../screens/DoctorProfile/DoctorProfile";
import Help from "../screens/Help/PatientHelp";
import NotFound from "../screens/NotFound/NotFound";
import PatientRecord from "../screens/PatientRecord/PatientRecord";
import ShareInformation from "../screens/ShareInformation/ShareInformation";

export const doctor_routes = {
  path: "/doctor",
  element: (
    <SidebarLayout>
      <DoctorSidebarCaller />
    </SidebarLayout>
  ),
  errorElement: <NotFound />,
  children: [
    {
      path: "patient-records",
      element: <PatientRecord />,
    },
    {
      path: "patient-records/:recordID",
      element: <PatientRecordDetail />,
    },
    {
      path: "share-info",
      element: <ShareInformation />,
    },
    {
      path: "add-patient",
      element: <AddPatient />,
    },
    {
      path: "all-patients",
      element: <DoctorPatients />,
    },
    {
      path: "help",
      element: <Help comingFrom={"doctor"} />,
    },
    {
      path: "profile",
      element: <DoctorProfile comingFrom={"profile"} />,
    },
    {
      path: "edit-profile",
      element: <DoctorProfile comingFrom={"edit-profile"} />,
    },
  ],
};
