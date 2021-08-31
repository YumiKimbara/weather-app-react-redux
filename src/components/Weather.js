import classes from "./Weather.module.css";

const Weather = () => {
  return (
    <>
      <div>
        <div id="localCurrentDate"></div>
        <div className={classes.content}></div>
        <div>
          <p id="hourlyTitle"></p>
          <p>Wheather modal</p>
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
    </>
  );
};

export default Weather;
