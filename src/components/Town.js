import classes from "./Town.module.css";
import useGetTime from "../hooks/useGetTime";
import { DeleteTownData, auth, WriteTownData } from "../firebaseConfig";
import Clouds from "../components/Media/WeatherIconClouds.svg";
import Clear from "../components/Media/WeatherIconClear.svg";
import Thunderstorm from "../components/Media/WeatherIconThunderstorm.svg";
import Snow from "../components/Media/WeatherIconSnow.svg";
import Rain from "../components/Media/WeatherIconRain.svg";
import Fog from "../components/Media/WeatherIconFog.svg";

const Town = (props) => {
  const { time } = useGetTime(props.TownDetails.timezone);
  let FinalWeatherIcon;

  switch (props.TownDetails.weather) {
    case "Clouds":
      FinalWeatherIcon = <img className={classes.loginImg} src={Clouds} alt="Company logo"></img>;
      break;
    case "Clear":
      FinalWeatherIcon = <img className={classes.loginImg} src={Clear} alt="Company logo"></img>;
      break;
    case "Thunderstorm":
      FinalWeatherIcon = (
        <img className={classes.loginImg} src={Thunderstorm} alt="Company logo"></img>
      );
      break;
    case "Snow":
      FinalWeatherIcon = <img className={classes.loginImg} src={Snow} alt="Company logo"></img>;
      break;
    case "Rain":
      FinalWeatherIcon = <img className={classes.loginImg} src={Rain} alt="Company logo"></img>;
      break;
    case "Fog":
      FinalWeatherIcon = <img className={classes.loginImg} src={Fog} alt="Company logo"></img>;
      break;
    case "Mist":
      FinalWeatherIcon = <img className={classes.loginImg} src={Fog} alt="Company logo"></img>;
      break;
    default:
      break;
  }

  const RemoveHandler = () => {
    DeleteTownData(props.TownDetails.name, auth.currentUser.uid);
    props.TriggerUseEffect();
  };

  const UpdateHandler = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${props.TownDetails.name}&units=metric&appid=32678199d6c7ee7ac70a27df685ee084`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();

      console.log(responseData);

      let lastUpdatedTime;

      const addZeroes = (num) => {
        return num < 10 ? "0" + num : num;
      };
      const today = new Date(new Date().setHours(new Date().getHours() + 7200));
      const hr = addZeroes(today.getHours());
      const min = addZeroes(today.getMinutes());
      lastUpdatedTime = hr + ":" + min;

      console.log(lastUpdatedTime);

      WriteTownData(
        props.TownDetails.name,
        props.UserID,
        lastUpdatedTime,
        responseData.main.temp,
        responseData.weather[0].main,
        props.TownDetails.timezone
      );
    } catch (err) {
    } finally {
      props.TriggerUseEffect();
    }
  };

  return (
    <div className={classes.town}>
      {FinalWeatherIcon}
      <h1 className={classes.townName}>{props.TownDetails.name}</h1>
      <h2 className={classes.townWeather}>{props.TownDetails.weather}</h2>
      <h2 className={classes.townTemp}>{Math.round(props.TownDetails.temperature)} °C</h2>
      <h3 className={classes.townTime}>{time}</h3>
      <h4 className={classes.townUpdate}>Last updated at: {props.TownDetails.lastUpdated}</h4>
      <button onClick={UpdateHandler} className={classes.updateButton}>
        Update
      </button>
      <button onClick={RemoveHandler} className={classes.deleteButton}>
        X
      </button>
    </div>
  );
};

export default Town;
