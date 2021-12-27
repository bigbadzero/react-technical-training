import { useState, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import ErrorModal from "../ui/ErrorModal";
import RegistrationCompleteModal from '../ui/RegistrationCompleteModal';
import LoadingSpinner from "../ui/LoadingSpinner";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );
  const { userInfo } = userLogin;
  const token = userInfo ? userInfo.token : null;
  const appLoading = userLogin.loading;

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <Fragment>
      {appLoading && <LoadingSpinner />}
      {(!appLoading && isLogin) && <LoginForm isLogin={isLogin} authModeHandler={switchAuthModeHandler} />}
      {(!appLoading && !isLogin) && <RegistrationForm isLogin={isLogin} authModeHandler={switchAuthModeHandler} />}
      <ErrorModal />
      <RegistrationCompleteModal />
    </Fragment>
  );
};
export default AuthForm;
