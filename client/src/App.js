import AuthLayout from "./components/AuthLayout/AuthLayout";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./screens/NotFound/NotFound";
import SidebarLayout from "./components/Sidebar/SidebarLayout";
import PatientTreatment from "./screens/PatientTreatment/PatientTreatment";
import TreatmentDetail from "./components/Treatment/TreatmentDetail";
import InstructionsDetail from "./components/Instructions/InstructionsDetail";
import PatientInstructions from "./screens/PatientInstructions/PatientInstructions";
import PatientProfile from "./screens/PatientProfile/PatientProfile";

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
    element: <SidebarLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "treatments",
        element: <PatientTreatment />,
        errorElement: <NotFound />,
      },
      {
        path: "instructions",
        element: <PatientInstructions />,
        errorElement: <NotFound />,
      },
      {
        path: "help",
        element: <SignUp />,
        errorElement: <NotFound />,
      },
      {
        path: "profile",
        element: <PatientProfile comingFrom={'profile'} />,
        errorElement: <NotFound />,
      },
      {
        path: "edit-profile",
        element: <PatientProfile comingFrom={'edit-profile'} />,
        errorElement: <NotFound />,
      },
      {
        path: "treatments/:treatmentID",
        element: <TreatmentDetail />,
        errorElement: <NotFound />,
      },
      {
        path: "instructions/:instructionsID",
        element: <InstructionsDetail />,
        errorElement: <NotFound />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
