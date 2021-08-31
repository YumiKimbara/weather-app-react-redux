import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherActions } from "../store/weather";

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

  function localTime(t) {
    return new Date().toLocaleString("en-US", {
      timeZone: t.timezone,
      timeStyle: "short",
      hourCycle: "h24",
    });
  }

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
  }, []);

  time = localTime(hourlyWeather).slice(0, 2);
  let time2 = localTime(hourlyWeather).slice(3);
  let time3 = time2[0] === "0" ? time2.slice(1) : time2;

  const renderHourlyContent = () => {
    for (
      let i = 0;
      i < hourlyWeather.hourly && hourlyWeather.hourly.length - 24;
      i++
    ) {
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
      let hourResult = +localTime2(hourlyWeather).slice(0, 2);

      let iconCode =
        hourlyWeather.hourly && hourlyWeather.hourly[i].weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
      return `
          <div>
          <div class="content">
            <p>${Math.round(hourlyWeather.hourly[i].temp)}°</p>
            <img src="${iconUrl}"class="weather-icons" />
            <p>${
              hourResult <= 11
                ? hourResult + "am"
                : hourResult === 12
                ? hourResult + "pm"
                : hourResult >= 13 && hourResult <= 23
                ? hourResult - 12 + "pm"
                : (hourResult = 12 + "am")
            }</p>
          </div>
          </div>
        </div>`;
    }
  };

  return <h1>hourly weather</h1>;
};

export default HourlyWeather;
