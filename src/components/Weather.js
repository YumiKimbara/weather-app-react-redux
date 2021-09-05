import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherActions } from "../store/weather";

import WeeklyWeather from "./WeeklyWeather";
import HourlyWeather from "./HourlyWeather";

import classes from "./Weather.module.css";

import { Modal } from "@material-ui/core";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import CloseIcon from "@material-ui/icons/Close";

const Weather = () => {
  const weather = useSelector((state) => state.weather.fetchedData);
  const hourlyWeather = useSelector((state) => state.weather.fetchedHoulyData);
  const video = useSelector((state) => state.weather.video);
  const city = useSelector((state) => state.weather.city);
  const [showModal, setShowModal] = useState(false);
  const [celsiusForHourlyWeather, setCelsiusForHourlyWeather] =
    useState("metric");
  const [celsiusForWeeklyWeather, setCelsiusForWeeklyWeather] =
    useState("metric");
  const [temp, setTemp] = useState("°C");

  const dispatch = useDispatch();

  const api = {
    // key: "f87193c8c1fceec76b7fc9727dfdd1da",
    // key2: "b74f11c310e27f2b0b26642921ffe8ca",
    //Nashさんのkey↓
    key: "b2b86779f50b9bf6a8c0808905029f25",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  function getCurrentWeather(query, metric) {
    fetch(
      `${api.base}weather?q=${query}&units=${metric}&id=524901&appid=${api.key}`
    )
      .then((res) => {
        if (res.status === 404) {
          setShowModal(true);
        }
        if (res.status === 200) {
          res.json().then((jsonData) => {
            dispatch(weatherActions.getWeather(jsonData));
          });
        }
      })
      .catch((err) => {
        alert(`Something went wrong. ${err.message}`);
      });
  }

  useEffect(() => {
    getCurrentWeather("Vancouver", "metric");
  }, []);

  useEffect(() => {
    getCurrentWeather(city, "metric");
  }, [city]);

  function localTime(t) {
    return new Date().toLocaleString("en-US", {
      timeZone: t.timezone,
      timeStyle: "short",
      hourCycle: "h24",
    });
  }

  let timeForHour = localTime(hourlyWeather).slice(0, 2);
  let timeForMinute =
    localTime(hourlyWeather).slice(3)[0] === "0"
      ? localTime(hourlyWeather).slice(3).slice(1)
      : localTime(hourlyWeather).slice(3);

  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  function localDate(d) {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: d.timezone,
    });
  }

  const modalCloseHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal open={showModal} onClose={modalCloseHandler}>
          <div className={classes.modalContainer}>
            <div className={classes.closeBtn} onClick={modalCloseHandler}>
              <CloseIcon />
            </div>
            <p>Invalid city name. Please search again</p>
            <SentimentVeryDissatisfiedIcon />
          </div>
        </Modal>
      )}
      {weather && (
        <div className={classes.contentWrapper}>
          <div>
            <div>
              <p
                className={
                  video.includes("night") ? classes.nightMode : classes.dayMode
                }
              >
                Local time:
                {timeForHour <= 9
                  ? timeForHour.slice(1, 2) + ":" + timeForMinute + "am"
                  : timeForHour >= 10 && timeForHour <= 11
                  ? timeForHour + ":" + timeForMinute + "am"
                  : timeForHour === 12
                  ? timeForHour + ":" + timeForMinute + "pm"
                  : timeForHour >= 13 && timeForHour <= 23
                  ? timeForHour - 12 + ":" + timeForMinute + "pm"
                  : (timeForHour = 12 + ":" + timeForMinute + "am")}
                , {localDate(hourlyWeather)}
              </p>
            </div>
            <div className={classes.mainContentWrapper}>
              <div className={classes.content}>
                <span>{weather.name}, </span>
                <span>
                  {weather.sys && regionNames.of(weather.sys.country)}
                </span>
                <p className={classes.currentTemp}>
                  {weather.main && Math.round(weather.main.temp)}
                  <span id="renderCandF">{temp}</span>
                </p>
                <div>
                  <button
                    class={classes.tempButton}
                    type="button"
                    onClick={() => {
                      getCurrentWeather(city, "metric");
                      setCelsiusForHourlyWeather("metric");
                      setCelsiusForWeeklyWeather("metric");
                      setTemp("°C");
                    }}
                  >
                    °C
                  </button>
                  <span> / </span>
                  <button
                    class={classes.tempButton}
                    type="button"
                    onClick={() => {
                      getCurrentWeather(city, "imperial");
                      setCelsiusForHourlyWeather("imperial");
                      setCelsiusForWeeklyWeather("imperial");
                      setTemp("°F");
                    }}
                  >
                    °F
                  </button>
                </div>
                <div>
                  <p>{weather.weather && weather.weather[0].main}</p>
                  <p>
                    feels like{" "}
                    {weather.main && Math.round(weather.main.feels_like)}°
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className={classes.subTitle}>
                <h3
                  className={
                    video.includes("night")
                      ? classes.nightMode
                      : classes.dayMode
                  }
                >
                  Hourly Forecast - {weather.name}
                </h3>
              </div>
            </div>
            <div
              className={
                video.includes("night") ? classes.nightMode : classes.dayMode
              }
            >
              <HourlyWeather
                celsiusForHourlyWeather={celsiusForHourlyWeather}
              />
            </div>
            <div>
              <div className={classes.subTitle}>
                <h3
                  class={
                    video.includes("night")
                      ? classes.nightMode
                      : classes.dayMode
                  }
                >
                  Weekly Forecast - {weather.name}
                </h3>
              </div>
            </div>
            <div
              className={
                (classes.scroll,
                video.includes("night") ? classes.nightMode : classes.dayMode)
              }
            >
              <WeeklyWeather
                celsiusForWeeklyWeather={celsiusForWeeklyWeather}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Weather;
