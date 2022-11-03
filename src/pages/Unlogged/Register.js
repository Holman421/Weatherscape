import useInput from "../../hooks/useInput";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import WeatherscapeLogo from "../../components/Media/WeatherscapeLogo.svg";
import PasswordIcon from "../../components/Media/FormPasswordIcon.svg";
import EmailIcon from "../../components/Media/FormEmailIcon.svg";

const Register = (props) => {
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

  const {
    value: enteredPasswordConfirm,
    isValid: enteredPasswordConfirmIsValid,
    hasError: passwordConfirmInputHasError,
    valueChangeHandler: passwordConfirmInputChangeHandler,
    inputBlurHandler: passwordConfirmInputBlurHandler,
    reset: resetPasswordConfirmInput,
  } = useInput((value) => value.trim().length > 5 && value === enteredPassword);

  let passwordError;

  if (enteredPasswordConfirm.trim().length < 6) {
    passwordError = "Password must be atleast 6 characters";
  } else if (enteredPasswordConfirm !== enteredPassword) {
    passwordError = "Passwords don't match";
  }

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid && enteredPasswordConfirmIsValid) {
    formIsValid = true;
  }

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword);
    } catch (error) {
      console.log(error.message);
    }
  };

  const formSubmitssionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      resetEmailInput();
      resetPasswordInput();
      resetPasswordConfirmInput();
      return;
    }
    register();
  };

  return (
    <form
      className={props.showRegister ? classes.loginForm : `${classes.loginForm} ${classes.opacity}`}
      onSubmit={formSubmitssionHandler}>
      <img className={classes.loginImg} src={WeatherscapeLogo} alt="Company logo"></img>
      <h1 className={classes.loginHeader}>Register</h1>
      <p className={classes.loginDesc}>Please register to use platform</p>
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
          <img className={classes.EmailImg} alt="Company logo" src={PasswordIcon}></img>
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

        <div className={classes.inputWrapper}>
          <img className={classes.EmailImg} alt="Company logo" src={PasswordIcon}></img>
          <input
            placeholder="Confirm Password"
            type="password"
            onChange={passwordConfirmInputChangeHandler}
            value={enteredPasswordConfirm}
            onBlur={passwordConfirmInputBlurHandler}
            className={
              passwordConfirmInputHasError
                ? `${classes.invalid} ${classes.loginInput}`
                : classes.loginInput
            }
          />
        </div>
        {passwordConfirmInputHasError && <p className={classes.errorText}>{passwordError}</p>}
        <button
          className={formIsValid ? classes.loginButtonActive : classes.loginButtonDeactive}
          disabled={!formIsValid}>
          Submit
        </button>
      </div>

      <p className={classes.loginFooter}>
        Already have account ?{" "}
        <Link className={classes.link} onClick={props.showLoginHandler}>
          Log in !
        </Link>
      </p>
    </form>
  );
};

export default Register;
