import AuthLayout from "./components/AuthLayout/AuthLayout";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./screens/NotFound/NotFound";
import SidebarLayout from "./components/Sidebar/SidebarLayout";

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
        path: "home",
        element: <SignUp />,
        errorElement: <NotFound />,
      },
      {
        path: "instructions",
        element: <SignUp />,
        errorElement: <NotFound />,
      },
      {
        path: "help",
        element: <SignUp />,
        errorElement: <NotFound />,
      },
      {
        path: "profile",
        element: <SignUp />,
        errorElement: <NotFound />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
