import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherActions } from "../store/weather";

import classes from "./Weather.module.css";

const Weather = () => {
  const weather = useSelector((state) => state.weather.fetchedData);
  console.log(weather);

  const dispatch = useDispatch();

  const api = {
    key: "f87193c8c1fceec76b7fc9727dfdd1da",
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
          //   allDataFromAPI = jsonData;
          //display current content
          //   renderCurrentWeather(jsonData);
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

  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  console.log(weather.weather && weather.weather[0].main);
  return (
    <>
      {weather && (
        <div>
          <div>
            <div id="localCurrentDate"></div>
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
              <p id="hourlyTitle"></p>
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
