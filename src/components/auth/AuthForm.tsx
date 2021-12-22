import classes from "./AuthForm.module.css";
import { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );
  const { userInfo } = userLogin;
  const isLoggedIn = userInfo ? userInfo.isLoggedIn : null;
  const appLoading = userLogin.loading;

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredEmail = email;
    const enteredPassword = password;

    let url: string;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIe4ICqaj0KRGu0PW9oB-LO18Tdp49XsU";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIe4ICqaj0KRGu0PW9oB-LO18Tdp49XsU";
    }
    // reference dispatch
    setEmail("");
    setPassword("");
    dispatch(login(url, enteredEmail, enteredPassword));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Fragment>
      {!appLoading ? (
        <Fragment>
          <img src={process.env.PUBLIC_URL + "/CGILogo.jpg"} alt="" />
          <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
              <div className={classes.control}>
                <label htmlFor="email">Your Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  required
                  value={email}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="password">Your Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  required
                  value={password}
                />
              </div>
              <div className={classes.actions}>
                {!isLoading && (
                  <button>{isLogin ? "Login" : "Create Account"}</button>
                )}
                {isLoading && <p>Sending request...</p>}
                <button
                  type="button"
                  className={classes.toggle}
                  onClick={switchAuthModeHandler}
                >
                  {isLogin
                    ? "Create new account"
                    : "Login with existing account"}
                </button>
              </div>
            </form>
            <ErrorModal />
          </section>
        </Fragment>
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
};
export default AuthForm;
