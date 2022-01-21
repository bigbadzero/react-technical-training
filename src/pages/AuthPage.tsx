import AuthForm from "../components/auth/AuthForm";

const AuthPage = () => {
  return <AuthForm errorContainer={document.getElementById("errorModal-root")}/>;
};
export default AuthPage;
