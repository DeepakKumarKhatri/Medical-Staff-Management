import AuthLayout from "./components/Layouts/AuthLayout";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./screens/NotFound/NotFound";
import { patient_routes } from "./routes/PatientRoutes";
import { doctor_routes } from "./routes/DoctorRoutes";

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
]);

export default function App() {
  return <RouterProvider router={router} />;
}
