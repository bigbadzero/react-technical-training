import classes from "./AuthForm.module.css";
import { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../store/actions/userAction";
import Datepicker from 'react-datepicker';


const RegistrationForm: React.FC<{
  isLogin: boolean;
  authModeHandler: () => void;
}> = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredEmail = email;
    const enteredPassword = password;
    const enteredFirstName = firstName;
    const enteredLastName = lastName;
    const enteredBirthday = birthday;
    // reference dispatch
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setBirthday(new Date());

    dispatch(register(enteredEmail, enteredPassword, enteredFirstName, enteredLastName, enteredBirthday));
    props.authModeHandler();
  };

  return(
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
          <div className={classes.control}>
            <label htmlFor="firstName">First Name</label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              id="firstName"
              required
              value={firstName}
            />
            </div>
            <div className={classes.control}>
            <label htmlFor="lastName">Last Name</label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              id="lastName"
              required
              value={lastName}
            />
            <div className={classes.control}>
            <label htmlFor="birthday">Your Birthday</label>
            <Datepicker 
            selected={birthday} 
            onChange={(birthday: Date) => setBirthday(birthday!)}
            />
          </div>
          <div className={classes.actions}>
            <button>Register</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={props.authModeHandler}
            >
              Login with existing account
            </button>
          </div>
          </div>
        </form>
      </section>
    </Fragment>
  );
};
export default RegistrationForm;
