const WeatherModal = () => {
  return (
    <>
      <div class="content-section">
        <div id="localCurrentDate"></div>
        <div id="container-for-current-weather"></div>
        <div>
          <p id="hourlyTitle"></p>
          <p>Wheather modal</p>
        </div>
        <div id="scroll">
          <div
            id="container-for-hourly-weather"
            class="hourly-content-direction"
          ></div>
        </div>
        <div>
          <p id="weeklyTitle"></p>
        </div>
        <div
          id="container-for-weekly-weather"
          class="weekly-content-direction"
        ></div>
      </div>
    </>
  );
};

export default WeatherModal;
