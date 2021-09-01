import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherActions } from "../store/weather";

import classes from "./HourlyWeather.module.css";

const HourlyWeather = () => {
  const weather = useSelector((state) => state.weather.fetchedData);
  const hourlyWeather = useSelector((state) => state.weather.fetchedHoulyData);

  console.log(hourlyWeather);

  const dispatch = useDispatch();

  const api = {
    // key: "f87193c8c1fceec76b7fc9727dfdd1da",
    //Nashさんのkey↓
    key: "b2b86779f50b9bf6a8c0808905029f25",
    base: "http://api.openweathermap.org/data/2.5/",
  };

  let time = "";
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
          //render hourly content
          dispatch(weatherActions.getHourlyWeather(dataHour));
          // renderHourlyContent(dataHour);
          //changeBackground(dataHour);
          //render local time and Date
        });
      })
      .catch((err) => {
        alert(`Something went wrong. ${err.message}`);
      });
  }

  useEffect(() => {
    getHourlyWeather(weather, "metric");
  }, [weather]);

  // const renderHourlyContent = () => {
  //   let result = [];
  //   for (let i = 0; i < hourlyWeather.hourly.length - 24; i++) {
  //     //get every hour
  //     function localTime2(t) {
  //       let nextHour = new Date();
  //       nextHour.setHours(nextHour.getHours() + i);
  //       return nextHour.toLocaleString("en-US", {
  //         timeZone: t.timezone,
  //         timeStyle: "short",
  //         hourCycle: "h24",
  //       });
  //     }
  //     let hourResult = +localTime2(hourlyWeather).slice(0, 2);

  //     let iconCode =
  //       hourlyWeather.hourly && hourlyWeather.hourly[i].weather[0].icon;
  //     const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

  //     //   `<div>
  //     //   <div class="content">
  //     //     <p>{Math.round(hourlyWeather.hourly[i].temp)}°</p>
  //     //     <img src={iconUrl} class="weather-icons" />
  //     //     <p>
  //     //       {hourResult <= 11
  //     //         ? hourResult + "am"
  //     //         : hourResult === 12
  //     //         ? hourResult + "pm"
  //     //         : hourResult >= 13 && hourResult <= 23
  //     //         ? hourResult - 12 + "pm"
  //     //         : (hourResult = 12 + "am")}
  //     //     </p>
  //     //   </div>
  //     // </div>`;

  //     return console.log(hourlyWeather.hourly);
  //   }
  // };

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

      // console.log(hourResult);

      // let iconCode =
      //   hourlyWeather.hourly && hourlyWeather.hourly[i].weather[0].icon;
      // const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

      // return (
      //   <div>
      //     <div class="content">
      //       <p>{Math.round(hourlyWeather.hourly[i].temp)}°</p>
      //       <img src={iconUrl} class="weather-icons" />
      //       <p>
      //         {hourResult <= 11
      //           ? hourResult + "am"
      //           : hourResult === 12
      //           ? hourResult + "pm"
      //           : hourResult >= 13 && hourResult <= 23
      //           ? hourResult - 12 + "pm"
      //           : (hourResult = 12 + "am")}
      //       </p>
      //     </div>
      //   </div>
      // );
    });

  const allTime = hourResult && hourResult.slice(0, 24);

  let iconUrl =
    allTime &&
    allTime.map((item, i) => {
      const iconCodes =
        hourlyWeather.hourly && hourlyWeather.hourly[i].weather[0].icon;
      return "http://openweathermap.org/img/w/" + iconCodes + ".png";
    });

  return (
    <>
      <h1>hourly weather</h1>
      {hourlyWeather.hourly && (
        <div className={classes.scroll}>
          {allTime.map((item, i) => {
            {
              console.log(item);
            }
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
                ) : { item } === 12 ? (
                  <p>{item} pm</p>
                ) : { item } >= 13 && { item } <= 23 ? (
                  <p>{item - 12} pm</p>
                ) : (
                  <p>12 am</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default HourlyWeather;
