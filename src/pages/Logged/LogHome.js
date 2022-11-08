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

  const filterData = (data) => {
    const loadedTowns = [];
    for (const key in data) {
      if (key.includes(props.UserID)) {
        loadedTowns.push({
          id: key,
          name: data[key].name,
          temperature: data[key].temperature,
          timezone: data[key].timezone,
          weather: data[key].weather,
          lastUpdated: data[key].lastUpdated,
        });
      }
    }
    setTowns(loadedTowns);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("https://weather-app-d315c-default-rtdb.europe-west1.firebasedatabase.app/towns.json")
      .then((response) => response.json())
      .then((data) => filterData(data))
      .then(setIsLoading(false));
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
