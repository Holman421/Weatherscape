import classes from "./BackgroundLogged.module.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const Background = (props) => {
  const navigate = useNavigate();

  const easterEgg = () => {
    alert("You just found easteregg ! You will have extra luck tomorrow.");
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const goMain = () => {
    navigate("/");
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
        <div className={classes.middleCloudsContainerSmall}>
          <div className={classes.middleCloud1}></div>
          <div className={classes.middleCloud3}></div>
          <div className={classes.middleCloud4Small}>
            <Link to="/addtown" className={`${classes.linkSmall} ${classes.marginA}`}>
              Add Town
            </Link>
            <Link onClick={logout} className={classes.linkSmall}>
              Logout
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
          <div onClick={goMain} className={classes.middleCloud5Small}>
            <h1>Weatherscape</h1>
          </div>
        </div>
        {props.children}
      </div>
    </>
  );
};

export default Background;
