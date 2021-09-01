import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherActions } from "../store/weather";

import WeeklyWeather from "./WeeklyWeather";
import HourlyWeather from "./HourlyWeather";

import classes from "./Weather.module.css";

const Weather = () => {
  const weather = useSelector((state) => state.weather.fetchedData);
  const hourlyWeather = useSelector((state) => state.weather.fetchedHoulyData);
  console.log(weather);

  const dispatch = useDispatch();

  const api = {
    key: "f87193c8c1fceec76b7fc9727dfdd1da",
    //Nashさんのkey↓
    // key: "b2b86779f50b9bf6a8c0808905029f25",
    base: "http://api.openweathermap.org/data/2.5/",
  };

  function getCurrentWeather(query, metric) {
    fetch(
      `${api.base}weather?q=${query}&units=${metric}&id=524901&appid=${api.key}`
    )
      .then((res) => {
        if (res.status === 404) {
          //   const modalContainer = document.querySelector(".modal-container");
          //   const modal = document.querySelector(".modal");
          //   const overlay = document.querySelector(".overlay");
          //   const closeBtn = document.querySelector(".close-btn");
          //   modalContainer.classList.remove("hidden");
          //   overlay.classList.remove("hidden");
          //   modal.innerHTML = "Invalid city name.<br />" + "Please search again.";
          //   closeBtn.addEventListener("click", () => {
          //     modalContainer.classList.add("hidden");
          //     overlay.classList.add("hidden");
          //   });
          //   overlay.addEventListener("click", () => {
          //     modalContainer.classList.add("hidden");
          //     overlay.classList.add("hidden");
          //   });
        }
        res.json().then((jsonData) => {
          dispatch(weatherActions.getWeather(jsonData));
          // get Hourly result from Web API
          // getHourlyWeather(jsonData, metric);
          //get weekly result from Web API
          // getWeeklyWeather(jsonData, metric);
        });
      })
      .catch((err) => {
        alert(`Something went wrong. ${err.message}`);
      });
  }

  useEffect(() => {
    getCurrentWeather("Vancouver", "metric");
  }, []);

  function localTime(t) {
    return new Date().toLocaleString("en-US", {
      timeZone: t.timezone,
      timeStyle: "short",
      hourCycle: "h24",
    });
  }

  let time = localTime(hourlyWeather).slice(0, 2);
  let time2 = localTime(hourlyWeather).slice(3);
  let time3 = time2[0] === "0" ? time2.slice(1) : time2;

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

  return (
    <>
      {weather && (
        <div>
          <div>
            <div>
              <p>
                Local time:
                {time <= 9
                  ? time.slice(1, 2) + ":" + time3 + "am"
                  : time >= 10 && time <= 11
                  ? time + ":" + time3 + "am"
                  : time === 12
                  ? time + ":" + time3 + "pm"
                  : time >= 13 && time <= 23
                  ? time - 12 + ":" + time3 + "pm"
                  : (time = 12 + ":" + time3 + "am")}
                , {localDate(hourlyWeather)}
              </p>
            </div>
            <div className={classes.content}>
              <p>{weather.name}</p>
              <p>{weather.sys && regionNames.of(weather.sys.country)}</p>
              <span id="current-temp">
                {weather.main && Math.round(weather.main.temp)}
                <span id="renderCandF">°C</span>
              </span>
              <div>
                <button class="button" type="button" id="celsius">
                  °C
                </button>
                <span> / </span>
                <button class="button" type="button" id="fahrenheit">
                  °F
                </button>
              </div>
              <div class="content">
                <p>{weather.weather && weather.weather[0].main}</p>
                <p>
                  feels like{" "}
                  {weather.main && Math.round(weather.main.feels_like)}°
                </p>
              </div>
              <p class="displayDate"></p>
            </div>
            <div>
              <h2 class="sub-title">Hourly Forecast - {weather.name}</h2>
            </div>
            <div id="scroll">
              <div
                id="container-for-hourly-weather"
                className={classes.hourlyContentDirection}
              ></div>
            </div>
            <div>
              <p id="weeklyTitle"></p>
            </div>
            <div
              id="container-for-weekly-weather"
              className={classes.weeklyContentDirection}
            ></div>
          </div>
          <WeeklyWeather />
          <HourlyWeather />
          <div className={(classes.modalContainer, classes.hidden)}>
            <i class="fas fa-times closeBtn"></i>
            <div class="modal"></div>
          </div>
          <div className={(classes.overlay, classes.hidden)}></div>
        </div>
      )}
    </>
  );
};

export default Weather;
