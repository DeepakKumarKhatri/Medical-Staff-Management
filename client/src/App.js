import AuthLayout from "./components/Layouts/AuthLayout";
import SignUp from "./components/Auth/components/SignUp";
import SignIn from "./components/Auth/components/SignIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./screens/NotFound/NotFound";
import PatientTreatment from "./screens/PatientTreatment/PatientTreatment";
import PatientInstructions from "./screens/PatientInstructions/PatientInstructions";
import PatientProfile from "./screens/PatientProfile/PatientProfile";
import TreatmentDetail from "./components/Treatment/TreatmentDetail";
import InstructionsDetail from "./components/Instructions/InstructionsDetail";
import DoctorProfile from "./screens/DoctorProfile/DoctorProfile";
import DoctorPatients from "./screens/DoctorPatients/DoctorPatients";
import AddPatientForDoctor from "./components/Forms/AddPatient";
import PatientRecordDetail from "./components/MedicalRecords/PatientRecordDetail";
import PatientRecord from "./screens/PatientRecord/PatientRecord";
import Help from "./screens/Help/Help";
import UserSelectionForm from "./screens/ManageUsers/UserSelectionForm";
import Reports from "./screens/Reports/Reports";
import ClinicManagerProfile from "./screens/ClinicManagerProfile/ClinicManagerProfile";
import Clinic_Managers from "./screens/ManageUsers/Clinic_Managers";
import Patients from "./screens/ManageUsers/Patients";
import Doctors from "./screens/ManageUsers/Doctors";
import Feedback from "./screens/Feedbacks/Feedback";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Unauthorized from "./screens/Unauthoried/Unauthoried";
import PatientDashboard from "./screens/Dashboards/PatientDashboard";
import DoctorDashboard from "./screens/Dashboards/DoctorDashboard";
import ClinicManagerDashboard from "./screens/Dashboards/ClinicManagerDashboard";

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
    element: <ProtectedRoute component={PatientDashboard} forUser="patient" />,
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
        element: <Help comingFrom={"patient"} />,
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
    element: <ProtectedRoute component={DoctorDashboard} forUser="doctor" />,
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
        path: "add-patient",
        element: <AddPatientForDoctor />,
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
  },
  {
    path: "/clinic_manager",
    element: <ProtectedRoute component={ClinicManagerDashboard} forUser="clinic_manager" />,
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
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
