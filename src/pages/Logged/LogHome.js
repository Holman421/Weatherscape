import { useEffect, useState } from "react";
import BackgroundLogged from "../../components/UI/BackgroundLogged";
import classes from "./LogHome.module.css";
import Town from "../../components/Town";
import Loading from "../../components/UI/Loading";

const LogHome = (props) => {
  const [towns, setTowns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [triggerUseEffect, setTriggerUseEffect] = useState(false);

  const setTriggerUseEffectHandler = () => {
    setTriggerUseEffect(!triggerUseEffect);
  };

  useEffect(() => {
    const fetchTowns = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://weather-app-d315c-default-rtdb.europe-west1.firebasedatabase.app/towns.json"
      );
      if (!response.ok) {
        console.log("Something went wrong");
      }
      const responseData = await response.json();
      const loadedTowns = [];
      for (const key in responseData) {
        if (key.includes(props.UserID)) {
          loadedTowns.push({
            id: key,
            name: responseData[key].name,
            temperature: responseData[key].temperature,
            timezone: responseData[key].timezone,
            weather: responseData[key].weather,
            lastUpdated: responseData[key].lastUpdated,
          });
        }
        setTowns(loadedTowns);
        setIsLoading(false);
      }
    };
    fetchTowns().catch((error) => {
      setIsLoading(false);
    });
  }, [triggerUseEffect, props.UserID]);

  let descDiv;

  if (towns.length === 0) {
    descDiv = <p className={classes.descDiv}>No town forecasts added</p>;
  } else {
    descDiv = "";
  }

  return (
    <>
      <BackgroundLogged></BackgroundLogged>
      {isLoading ? (
        <>
          <Loading></Loading>
        </>
      ) : (
        <>
          {descDiv}
          <div className={classes.townGrid}>
            {towns.map((town) => {
              return (
                <Town
                  UserID={props.UserID}
                  key={town.id}
                  TownDetails={town}
                  TriggerUseEffect={setTriggerUseEffectHandler}></Town>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default LogHome;
