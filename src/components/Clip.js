import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./Clip.module.css";

const Clip = () => {
  const video = useSelector((state) => state.weather.video);
  const videoRef = useRef();
  const previousUrl = useRef(video);

  useEffect(() => {
    if (previousUrl.current === video) {
      return;
    }

    if (videoRef.current) {
      videoRef.current.load();
    }

    previousUrl.current = video;
  }, [video]);

  return (
    <video
      ref={videoRef}
      className={classes.bgVideoContent}
      autoPlay
      muted
      loop
    >
      <source src={video} type="video/mp4" />
      Your browser is not supported!
    </video>
  );
};

export default Clip;
