import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherActions } from "../store/weather";

import classes from "./HourlyWeather.module.css";

const HourlyWeather = ({ celsiusForHourlyWeather }) => {
  const weather = useSelector((state) => state.weather.fetchedData);
  const hourlyWeather = useSelector((state) => state.weather.fetchedHoulyData);

  const dispatch = useDispatch();

  const api = {
    // key1: "f87193c8c1fceec76b7fc9727dfdd1da",
    // key2: "b74f11c310e27f2b0b26642921ffe8ca",
    //Nashさんのkey↓
    key: "b2b86779f50b9bf6a8c0808905029f25",
    base: "http://api.openweathermap.org/data/2.5/",
  };

  function localTime(t) {
    return new Date().toLocaleString("en-US", {
      timeZone: t.timezone,
      timeStyle: "short",
      hourCycle: "h24",
    });
  }

  const changeBackground = (dataHour) => {
    // const videoChange = document.getElementById("video-change");
    const weatherCondition = dataHour.current.weather[0].main;
    console.log(weatherCondition);
    const currentTime = +localTime(dataHour).slice(0, 2);
    console.log(currentTime);

    if (
      (weatherCondition === "Clouds" ||
        weatherCondition === "Smoke" ||
        weatherCondition === "Haze" ||
        weatherCondition === "Dust" ||
        weatherCondition === "Fog" ||
        weatherCondition === "Sand" ||
        weatherCondition === "Ash") &&
      currentTime >= 4 &&
      currentTime <= 20
    ) {
      dispatch(weatherActions.changeVideo("bg-video/cloudy.mp4"));
      //changeToDayMode();
    }
    if (
      (weatherCondition === "Clouds" ||
        weatherCondition === "Smoke" ||
        weatherCondition === "Haze" ||
        weatherCondition === "Dust" ||
        weatherCondition === "Fog" ||
        weatherCondition === "Sand" ||
        weatherCondition === "Ash") &&
      ((currentTime >= 21 && currentTime <= 24) ||
        (currentTime >= 1 && currentTime <= 3))
    ) {
      dispatch(weatherActions.changeVideo("bg-video/cloudy_night.mp4"));

      //changeToNightMode();
    }
    if (weatherCondition === "Clear" && currentTime >= 4 && currentTime <= 20) {
      dispatch(weatherActions.changeVideo("bg-video/sunny.mp4"));

      //changeToDayMode();
    }
    if (
      weatherCondition === "Clear" &&
      ((currentTime >= 21 && currentTime <= 24) ||
        (currentTime >= 1 && currentTime <= 3))
    ) {
      dispatch(weatherActions.changeVideo("bg-video/sunny_night.mp4"));

      //changeToNightMode();
    }
    if (
      (weatherCondition === "Rain" ||
        weatherCondition === "Thunderstorm" ||
        weatherCondition === "Drizzle" ||
        weatherCondition === "Mist" ||
        weatherCondition === "Squall" ||
        weatherCondition === "Tornado") &&
      currentTime >= 4 &&
      currentTime <= 20
    ) {
      dispatch(weatherActions.changeVideo("bg-video/rainy.mp4"));

      //changeToDayMode();
    }
    if (
      (weatherCondition === "Rain" ||
        weatherCondition === "Thunderstorm" ||
        weatherCondition === "Drizzle" ||
        weatherCondition === "Mist" ||
        weatherCondition === "Squall" ||
        weatherCondition === "Tornado") &&
      ((currentTime >= 21 && currentTime <= 24) ||
        (currentTime >= 1 && currentTime <= 3))
    ) {
      dispatch(weatherActions.changeVideo("bg-video/rainy_night.mp4"));

      //changeToNightMode();
    }

    if (weatherCondition === "Snow" && currentTime >= 4 && currentTime <= 20) {
      dispatch(weatherActions.changeVideo("bg-video/snow.mp4"));

      //changeToNightMode();
    }
    if (
      weatherCondition === "Snow" &&
      ((currentTime >= 21 && currentTime <= 24) ||
        (currentTime >= 1 && currentTime <= 3))
    ) {
      dispatch(weatherActions.changeVideo("bg-video/snow_night.mp4"));

      //changeToNightMode();
    }
  };

  function getHourlyWeather(data, units) {
    fetch(
      data.coord &&
        `${api.base}onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=${units}&exclude=curret,minutely,daily,alerts&appid=${api.key}`
    )
      .then((res) => {
        if (!res.ok) {
          alert("Something went wrong!");
        }
        res.json().then((dataHour) => {
          dispatch(weatherActions.getHourlyWeather(dataHour));
          changeBackground(dataHour);
        });
      })
      .catch((err) => {
        alert(`Something went wrong. ${err.message}`);
      });
  }

  useEffect(() => {
    getHourlyWeather(weather, celsiusForHourlyWeather);
  }, [weather]);

  const hourResult =
    hourlyWeather.hourly &&
    hourlyWeather.hourly.map((item, i) => {
      //get every hour
      function localTime2(t) {
        let nextHour = new Date();
        nextHour.setHours(nextHour.getHours() + i);
        return nextHour.toLocaleString("en-US", {
          timeZone: t.timezone,
          timeStyle: "short",
          hourCycle: "h24",
        });
      }
      let hourTime = +localTime2(hourlyWeather).slice(0, 2);
      return hourTime;
    });

  const allTime = hourResult && hourResult.slice(0, 24);

  return (
    <>
      {hourlyWeather.hourly &&
        allTime.map((item, i) => {
          const iconCodes =
            hourlyWeather.hourly && hourlyWeather.hourly[i].weather[0].icon;
          return (
            <div className={classes.content}>
              <p>{Math.round(hourlyWeather.hourly[i].temp)}°</p>
              <img
                src={"http://openweathermap.org/img/w/" + iconCodes + ".png"}
                class="weather-icons"
              />
              {item <= 11 ? (
                <p>{item} am</p>
              ) : item === 12 ? (
                <p>{item} pm</p>
              ) : item >= 13 && item <= 23 ? (
                <p>{item - 12} pm</p>
              ) : (
                <p>12 am</p>
              )}
            </div>
          );
        })}
    </>
  );
};

export default HourlyWeather;
