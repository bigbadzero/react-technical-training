import classes from "./AuthForm.module.css";
import { useState, Fragment} from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/userAction";

const LoginForm: React.FC<{ isLogin: boolean; authModeHandler: () => void }> = (
  props
) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredEmail = email;
    const enteredPassword = password;
    
    // reference dispatch
    setEmail("");
    setPassword("");
    dispatch(login(enteredEmail, enteredPassword));
  };

  return (
    <Fragment>
      <img src={process.env.PUBLIC_URL + "/CGILogo.jpg"} alt="" />
      <section className={classes.auth}>
        <h1>Login</h1>
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
            <button>Login</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={props.authModeHandler}
            >
              Create new account
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};
export default LoginForm;
