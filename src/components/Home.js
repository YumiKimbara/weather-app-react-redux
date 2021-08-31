import classes from "./Home.module.css";

const Home = () => {
  const sunnyBg = "/bg-video/sunny.mp4";

  return (
    <>
      <div class="night-mode">
        <div class={classes.bgVideo}>
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
        <div class="input-container">
          <div class="input-section">
            <i class="fas fa-search icon night-icon"></i>
            <form class="form">
              <input
                class="element-center use-icon"
                id="input"
                type="search"
                placeholder="Search by the city name"
              />
            </form>
          </div>
          <div class="content-section">
            <div id="localCurrentDate"></div>
            <div id="container-for-current-weather"></div>
            <div>
              <p id="hourlyTitle"></p>
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
        </div>
      </div>
      <div class="attribute">
        <p>
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
      <div class="modal-container hidden">
        <i class="fas fa-times close-btn"></i>
        <div class="modal"></div>
      </div>
      <div class="overlay hidden"></div>
    </>
  );
};

export default Home;
