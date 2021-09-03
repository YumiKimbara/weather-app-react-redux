import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherActions } from "../store/weather";

import WeeklyWeather from "./WeeklyWeather";
import HourlyWeather from "./HourlyWeather";

import classes from "./Weather.module.css";

import { Modal } from "@material-ui/core";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const Weather = () => {
  const weather = useSelector((state) => state.weather.fetchedData);
  const hourlyWeather = useSelector((state) => state.weather.fetchedHoulyData);
  const video = useSelector((state) => state.weather.video);
  const city = useSelector((state) => state.weather.city);
  const [showModal, setShowModal] = useState(false);

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
          setShowModal(true);
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
        });
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

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal open={showModal} onClose={handleClose}>
          <div className={classes.modalContainer}>
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
            <div className={classes.mainContentWrapper}>
              <div className={classes.content}>
                <span>{weather.name}, </span>
                <span>
                  {weather.sys && regionNames.of(weather.sys.country)}
                </span>
                <p className={classes.currentTemp}>
                  {weather.main && Math.round(weather.main.temp)}
                  <span id="renderCandF">°C</span>
                </p>
                <div>
                  <button class={classes.tempButton} type="button">
                    °C
                  </button>
                  <span> / </span>
                  <button class={classes.tempButton} type="button">
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
              </div>
            </div>
            <div>
              <h3
                class={
                  (classes.subTitle,
                  video.includes("night") ? classes.nightMode : classes.dayMode)
                }
              >
                Hourly Forecast - {weather.name}
              </h3>
            </div>
            <div
              className={
                video.includes("night") ? classes.nightMode : classes.dayMode
              }
            >
              <HourlyWeather />
            </div>
            <div>
              <h3
                class={
                  video.includes("night") ? classes.nightMode : classes.dayMode
                }
              >
                Weekly Forecast - {weather.name}
              </h3>
            </div>
            <div
              className={
                (classes.scroll,
                video.includes("night") ? classes.nightMode : classes.dayMode)
              }
            >
              <WeeklyWeather />
            </div>
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
