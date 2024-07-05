import InstructionsDetail from "../components/Instructions/InstructionsDetail";
import SidebarLayout from "../components/Layouts/SidebarLayout";
import PatientSidebarCaller from "../components/PatientSidebar/PatientSidebar";
import TreatmentDetail from "../components/Treatment/TreatmentDetail";
import Help from "../screens/Help/PatientHelp";
import NotFound from "../screens/NotFound/NotFound";
import PatientInstructions from "../screens/PatientInstructions/PatientInstructions";
import PatientProfile from "../screens/PatientProfile/PatientProfile";
import PatientTreatment from "../screens/PatientTreatment/PatientTreatment";


export const patient_routes = {
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
};
