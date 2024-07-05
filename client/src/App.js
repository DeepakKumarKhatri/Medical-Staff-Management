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
import PatientHelp from "./screens/PatientHelp/PatientHelp";
import PatientSidebarCaller from "./components/PatientSidebar/PatientSidebar";
import DoctorSidebarCaller from "./components/DoctorSidebar/DoctorSidebar";

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
        element: <PatientHelp />,
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
        path: "treatments",
        element: <PatientTreatment />,
      },
      {
        path: "instructions",
        element: <PatientInstructions />,
      },
      {
        path: "help",
        element: <PatientHelp />,
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
]);

export default function App() {
  return <RouterProvider router={router} />;
}
