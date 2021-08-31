import classes from "./Home.module.css";

import Weather from "./Weather";

const Home = () => {
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
            <form>
              <input
                className={
                  (classes.elementCenter, classes.useIcon, classes.input)
                }
                type="search"
                placeholder="Search by the city name"
              />
            </form>
          </div>
        </div>
      </div>
      <Weather />

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
    </>
  );
};

export default Home;
