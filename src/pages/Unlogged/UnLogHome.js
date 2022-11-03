import { useState } from "react";
import Background from "../../components/UI/Background";
import Login from "./Login";
import Register from "./Register";
import classes from "./UnLogHome.module.css";

const UnLogHome = (props) => {
  const [showDefault, setShowDefault] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const showDefaulHandler = () => {
    setShowDefault(!showDefault);
    setShowLogin(false);
    setShowRegister(false);
  };
  const showLoginHandler = () => {
    setShowDefault(false);
    setShowLogin(true);
    setShowRegister(false);
  };
  const showRegisterHandler = () => {
    setShowDefault(false);
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <div className={classes.wrapper}>
      <Background
        showDefault={showDefault}
        showRegister={showRegisterHandler}
        showLogin={showLoginHandler}
        showMain={showDefaulHandler}></Background>
      <Register showRegister={showRegister} showLoginHandler={showLoginHandler}></Register>
      <Login showLogin={showLogin} showRegisterHandler={showRegisterHandler}></Login>
    </div>
  );
};

export default UnLogHome;
