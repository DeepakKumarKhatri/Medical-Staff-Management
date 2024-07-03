import AuthLayout from "./components/AuthLayout/AuthLayout";
import SignUp from "./components/SignUp/SignUp";

export default function App() {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
}
