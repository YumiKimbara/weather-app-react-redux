import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { weatherActions } from "../store/weather";

const WeeklyWeather = () => {
  const weather = useSelector((state) => state.weather.fetchedData);
  const weeklyWeather = useSelector((state) => state.weather.fetchedWeeklyData);
  const dispatch = useDispatch();

  const api = {
    // key: "f87193c8c1fceec76b7fc9727dfdd1da",
    //Nashさんのkey↓
    key: "b2b86779f50b9bf6a8c0808905029f25",
    base: "http://api.openweathermap.org/data/2.5/",
  };

  const getWeeklyWeather = (data, units) => {
    weather &&
      fetch(
        `${api.base}onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=${units}&exclude=curret,minutely,hourly,alerts&appid=${api.key}`
      )
        .then((res) => {
          if (!res.ok) {
            alert("Something went wrong!");
          }
          res.json().then((dataWeek) => {
            dispatch(weatherActions.getWeeklyWeather(dataWeek));
          });
        })
        .catch((err) => {
          alert(`Something went wrong. ${err.message}`);
        });
  };

  useEffect(() => {
    getWeeklyWeather(weather, "metric");
  }, [weather]);

  console.log(weeklyWeather);

  // const weekResult = () => {

  //   function localDate2(d) {
  //     let tomorrow = new Date();
  //     tomorrow.setDate(tomorrow.getDate() + i);
  //     return tomorrow.toLocaleDateString("en-US", {
  //       weekday: "short",
  //       timeZone: d.timezone,
  //     });
  //   }
  //   localDate2(weeklyWeather);
  // };

  return (
    <>
      <div>
        <h2 class="sub-title">Weekly Forecast - {weather.name}</h2>
      </div>
      {weeklyWeather.daily &&
        weeklyWeather.daily.map((item, i) => {
          let iconCode = weeklyWeather.daily[i].weather[0].icon;

          return (
            <div>
              <div class="content">
                <p>Max: {Math.round(weeklyWeather.daily[i].temp.max)}°</p>
                <p>Min: {Math.round(weeklyWeather.daily[i].temp.min)}°</p>
                <img
                  src={"http://openweathermap.org/img/w/" + iconCode + ".png"}
                  class="weather-icons"
                />
                {console.log("<p>{localDate2(weeklyWeather)}</p>")}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default WeeklyWeather;
