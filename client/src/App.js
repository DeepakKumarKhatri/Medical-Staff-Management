import AuthLayout from "./components/Layouts/AuthLayout";
import SignUp from "./components/Auth/components/SignUp";
import SignIn from "./components/Auth/components/SignIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./screens/NotFound/NotFound";
import { patient_routes } from "./routes/PatientRoutes";
import { doctor_routes } from "./routes/DoctorRoutes";
import { clinic_manager_routes } from "./routes/ClinicManagerRoutes";

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
  patient_routes,
  doctor_routes,
  clinic_manager_routes,
]);

export default function App() {
  return <RouterProvider router={router} />;
}
