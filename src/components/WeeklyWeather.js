import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { weatherActions } from "../store/weather";

import { v4 as uuidv4 } from "uuid";

import classes from "./WeeklyWeather.module.css";

const WeeklyWeather = ({ celsiusForWeeklyWeather }) => {
  const weather = useSelector((state) => state.weather.fetchedData);
  const weeklyWeather = useSelector((state) => state.weather.fetchedWeeklyData);
  const dispatch = useDispatch();

  const api = {
    // key: "f87193c8c1fceec76b7fc9727dfdd1da",
    // key2: "b74f11c310e27f2b0b26642921ffe8ca",
    //Nashさんのkey↓
    key: "b2b86779f50b9bf6a8c0808905029f25",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  //get weekly weather
  const getWeeklyWeather = (data, units) => {
    weather &&
      fetch(
        `${api.base}onecall?lat=${data.coord && data.coord.lat}&lon=${
          data.coord && data.coord.lon
        }&units=${units}&exclude=curret,minutely,hourly,alerts&appid=${api.key}`
      )
        .then((res) => {
          if (!res.ok) {
            console.log("Something went wrong");
          }
          res.json().then((dataWeek) => {
            dispatch(weatherActions.getWeeklyWeather(dataWeek));
          });
        })
        .catch((err) => {
          alert(`Something went wrong. ${err.message}`);
        });
  };

  //whenever weather changes, update weekly weather
  useEffect(() => {
    getWeeklyWeather(weather, celsiusForWeeklyWeather);
  }, [weather]);

  return (
    <>
      {weeklyWeather.daily &&
        weeklyWeather.daily.map((_, i) => {
          const uniqueID = uuidv4();
          const localDate = (d) => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + i);
            return tomorrow.toLocaleDateString("en-US", {
              weekday: "short",
              timeZone: d.timezone,
            });
          };

          //get weather icon
          let iconCode = weeklyWeather.daily[i].weather[0].icon;

          return (
            <div key={uniqueID}>
              <div className={classes.weeklyContent}>
                <p>Max: {Math.round(weeklyWeather.daily[i].temp.max)}°</p>
                <p>Min: {Math.round(weeklyWeather.daily[i].temp.min)}°</p>
                <img src={"//openweathermap.org/img/w/" + iconCode + ".png"} />
                <p>{localDate(weeklyWeather)}</p>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default WeeklyWeather;
