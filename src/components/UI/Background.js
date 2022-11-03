import classes from "./Background.module.css";
import { Link } from "react-router-dom";

const Background = (props) => {
  const easterEgg = () => {
    alert("You just found easteregg ! You will have extra luck tomorrow.");
  };

  const showMain = () => {
    props.showMain();
  };

  const showLogin = () => {
    props.showLogin();
  };

  const showRegister = () => {
    props.showRegister();
  };

  return (
    <>
      <div className={classes.background}>
        <div className={classes.leftTopSun}></div>
        <div className={classes.leftTopCloud}></div>
        <div className={classes.leftBottomCloud1}></div>
        <div onClick={easterEgg} className={classes.leftBottomCloud2}></div>
        <div className={classes.rightBottomSun}></div>
        <div className={classes.rightBottomCloud1}></div>
        <div className={classes.rightBottomCloud2}></div>
        <div
          className={
            props.showDefault ? classes.middleCloudsContainer : classes.middleCloudsContainerSmall
          }>
          <div className={classes.middleCloud1}></div>
          <div className={classes.middleCloud3}></div>
          <div className={props.showDefault ? classes.middleCloud4 : classes.middleCloud4Small}>
            <Link
              onClick={showLogin}
              className={
                props.showDefault
                  ? `${classes.link} ${classes.marginFirstLink}`
                  : `${classes.linkSmall} ${classes.marginFirstLinkSmall}`
              }>
              Login
            </Link>

            <Link
              onClick={showRegister}
              className={props.showDefault ? classes.link : classes.linkSmall}>
              Register
            </Link>
          </div>
          <div className={classes.middleCloud2}></div>
          <div className={classes.middleDrop1}></div>
          <div className={classes.middleDrop2}></div>
          <div className={classes.middleDrop3}></div>
          <div className={classes.middleDrop4}></div>
          <div className={classes.middleDrop5}></div>
          <div className={classes.middleDrop6}></div>
          <div className={classes.middleDrop7}></div>
          <div
            onClick={() => {
              !props.showDefault && showMain();
            }}
            className={props.showDefault ? classes.middleCloud5 : classes.middleCloud5Small}>
            <h1>Weatherscape</h1>
          </div>
        </div>
        <div className={props.showDefault ? classes.mainDesc : classes.mainDescSmall}>
          <h3 className={classes.h3Margin}>Welcome to Weatherscape, the best forecast app!</h3>
          <h3>Please</h3>
          <section className={classes.buttonDiv}>
            <button
              className={classes.mainDescButton}
              onClick={() => {
                props.showDefault && showLogin();
              }}>
              Login
            </button>
            <p>Or</p>
            <button
              className={classes.mainDescButton}
              onClick={() => {
                props.showDefault && showRegister();
              }}>
              Register
            </button>
          </section>
        </div>
        {props.children}
      </div>
    </>
  );
};

export default Background;
