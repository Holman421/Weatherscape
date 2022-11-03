import useInput from "../../hooks/useInput";
import classes from "./Register.module.css";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useState } from "react";
import WeatherscapeLogo from "../../components/Media/WeatherscapeLogo.svg";
import PasswordIcon from "../../components/Media/FormPasswordIcon.svg";
import EmailIcon from "../../components/Media/FormEmailIcon.svg";

const Login = (props) => {
  const [badLogin, setBadLogin] = useState(false);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim().length > 5 && value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim().length > 5);
  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const formSubmitssionHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      resetEmailInput();
      resetPasswordInput();
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
    } catch (error) {
      console.log(error.message);
      setBadLogin(true);
    }
  };

  const forgotPasswordHandler = () => {
    alert("That sucks");
  };

  return (
    <form
      className={props.showLogin ? classes.loginForm : `${classes.loginForm} ${classes.opacity}`}
      onSubmit={formSubmitssionHandler}>
      <img className={classes.loginImg} alt="Company logo" src={WeatherscapeLogo}></img>
      <h1 className={classes.loginHeader}>Login</h1>
      <p className={classes.loginDesc}>Welcome to the best weather forecast app</p>
      <div className={classes.loginInputsDiv}>
        <div className={classes.inputWrapper}>
          <img className={classes.EmailImg} alt="Company logo" src={EmailIcon}></img>
          <input
            placeholder="Enter Email"
            type="email"
            onChange={emailInputChangeHandler}
            value={enteredEmail}
            onBlur={emailInputBlurHandler}
            className={
              emailInputHasError ? `${classes.invalid} ${classes.loginInput}` : classes.loginInput
            }
          />
        </div>
        {emailInputHasError && <p className={classes.errorText}>Enter a valid email</p>}

        <div className={classes.inputWrapper}>
          <img className={classes.PasswordImg} alt="Company logo" src={PasswordIcon}></img>
          <input
            placeholder="Enter Password"
            type="password"
            onChange={passwordInputChangeHandler}
            value={enteredPassword}
            onBlur={passwordInputBlurHandler}
            className={
              passwordInputHasError
                ? `${classes.invalid} ${classes.loginInput}`
                : classes.loginInput
            }
          />
        </div>
        {passwordInputHasError && (
          <p className={classes.errorText}>Password must be atleast 6 characters</p>
        )}
        {badLogin ? <p className={classes.errorText}>Wrong email or password</p> : ""}
        <p onClick={forgotPasswordHandler} className={classes.passwordForgot}>
          I forgot my password
        </p>
        <button
          className={formIsValid ? classes.loginButtonActive : classes.loginButtonDeactive}
          disabled={!formIsValid}>
          Submit
        </button>
      </div>

      <p className={classes.loginFooter}>
        Don't have account ?{" "}
        <Link className={classes.link} onClick={props.showRegisterHandler}>
          Create a free account.
        </Link>
      </p>
    </form>
  );
};

export default Login;
