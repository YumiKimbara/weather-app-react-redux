import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherActions } from "../store/weather";
import classes from "./Home.module.css";

import Weather from "./Weather";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.fetchedData);

  const sunnyBg = "/bg-video/sunny.mp4";

  return (
    <>
      <div class="night-mode">
        <div className={classes.bgVideo}>
          <video
            // id="video-change"
            className={classes.bgVideoContent}
            autoPlay
            muted
            loop
          >
            <source src={sunnyBg} type="video/mp4" />
            Your browser is not supported!
          </video>
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.inputSection}>
            <i class="fas fa-search icon night-icon"></i>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(weatherActions.getWeather(inputValue));
                console.log(inputValue);
              }}
            >
              <input
                className={
                  (classes.elementCenter, classes.useIcon, classes.input)
                }
                type="search"
                placeholder="Search by the city name"
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
            </form>
          </div>
        </div>
      </div>
      <Weather />

      <div>
        <p className={classes.attribute}>
          Icons made by
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{" "}
          from
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </p>
      </div>
    </>
  );
};

export default Home;
