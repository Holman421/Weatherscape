import classes from "./AddTown.module.css";
import Background from "../../components/UI/BackgroundLogged";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WriteTownData } from "../../firebaseConfig";
import useGetTime from "../../hooks/useGetTime";
import useInput from "../../hooks/useInput";
import { auth } from "../../firebaseConfig";
import TownIcon from "../../components/Media/FormTownIcon.svg";

function AddTown() {
  const { time } = useGetTime(3600);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    value: enteredTown,
    isValid: enteredTownlIsValid,
    hasError: townInputHasError,
    valueChangeHandler: townInputChangeHandler,
    inputBlurHandler: townInputBlurHandler,
    reset: resetEnteredTownInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (enteredTownlIsValid) {
    formIsValid = true;
  }

  const submitData = async (event) => {
    event.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${enteredTown}&units=metric&appid=32678199d6c7ee7ac70a27df685ee084`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();
      WriteTownData(
        enteredTown,
        auth.currentUser.uid,
        time,
        responseData.main.temp,
        responseData.weather[0].main,
        +responseData.timezone
      );
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("This town doesn't exist");
      resetEnteredTownInput();
    } finally {
    }
  };

  return (
    <>
      <Background />
      <form onSubmit={submitData} className={classes.loginForm}>
        <h1 className={classes.loginHeader}>Add new town</h1>
        <div className={classes.loginInputsDiv}>
          <img className={classes.TownImg} alt="Input town logo" src={TownIcon}></img>
          <input
            placeholder="Enter new town"
            type="text"
            id="town"
            onChange={townInputChangeHandler}
            value={enteredTown}
            onBlur={townInputBlurHandler}
            className={
              townInputHasError || error
                ? `${classes.invalid} ${classes.loginInput}`
                : classes.loginInput
            }
          />
          {townInputHasError && <p className={classes.errorText}>Town must not be empty</p>}
          {error ? <p className={classes.errorText}>{error}</p> : ""}

          {formIsValid ? (
            <button className={classes.loginButtonActive}>Add</button>
          ) : (
            <button disabled className={classes.loginButtonDeactive}>
              Add
            </button>
          )}
          <Link className={classes.link} to="/">
            Or go back to main page
          </Link>
        </div>
      </form>
    </>
  );
}

export default AddTown;
