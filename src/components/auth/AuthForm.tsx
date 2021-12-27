import classes from "./AuthForm.module.css";
import { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import LoginForm from './LoginForm'

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const userLogin = useSelector<RootState, UserState>((state) => state.userLogin);
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
      {!appLoading ? (
        <LoginForm isLogin={isLogin} authModeHandler={switchAuthModeHandler}/>
      ) : (
        <LoadingSpinner />
      )}
      <ErrorModal />
    </Fragment>
  );
};
export default AuthForm;
