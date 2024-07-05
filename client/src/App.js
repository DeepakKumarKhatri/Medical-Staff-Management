import AuthLayout from "./components/Layouts/AuthLayout";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./screens/NotFound/NotFound";
import SidebarLayout from "./components/Layouts/SidebarLayout";
import PatientTreatment from "./screens/PatientTreatment/PatientTreatment";
import TreatmentDetail from "./components/Treatment/TreatmentDetail";
import InstructionsDetail from "./components/Instructions/InstructionsDetail";
import PatientInstructions from "./screens/PatientInstructions/PatientInstructions";
import PatientProfile from "./screens/PatientProfile/PatientProfile";
import PatientSidebarCaller from "./components/PatientSidebar/PatientSidebar";
import DoctorSidebarCaller from "./components/DoctorSidebar/DoctorSidebar";
import PatientRecord from "./screens/PatientRecord/PatientRecord";
import ShareInformation from "./screens/ShareInformation/ShareInformation";
import AddPatient from "./components/Forms/AddPatient";
import DoctorPatients from "./screens/DoctorPatients/DoctorPatients";
import Help from "./screens/Help/PatientHelp";
import DoctorProfile from "./screens/DoctorProfile/DoctorProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthLayout>
        <SignIn />
      </AuthLayout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/register",
    element: (
      <AuthLayout>
        <SignUp />
      </AuthLayout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/patient",
    element: (
      <SidebarLayout>
        <PatientSidebarCaller />
      </SidebarLayout>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "treatments",
        element: <PatientTreatment />,
      },
      {
        path: "instructions",
        element: <PatientInstructions />,
      },
      {
        path: "help",
        element: <Help comingFrom={'patient'} />,
      },
      {
        path: "profile",
        element: <PatientProfile comingFrom={"profile"} />,
      },
      {
        path: "edit-profile",
        element: <PatientProfile comingFrom={"edit-profile"} />,
      },
      {
        path: "treatments/:treatmentID",
        element: <TreatmentDetail />,
      },
      {
        path: "instructions/:instructionsID",
        element: <InstructionsDetail />,
      },
    ],
  },
  {
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
        element: <Help comingFrom={'doctor'} />,
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
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
