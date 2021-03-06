import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./Clip.module.css";

const Clip = () => {
  const video = useSelector((state) => state.weather.video);
  const videoRef = useRef();
  const previousUrl = useRef(video);

  useEffect(() => {
    // ignore if the previous url is same as video url
    if (previousUrl.current === video) {
      return;
    }

    // load a video
    if (videoRef.current) {
      videoRef.current.load();
    }

    // set previous url to current video url
    previousUrl.current = video;
  }, [video]);

  return (
    <video
      ref={videoRef}
      className={classes.bgVideoContent}
      playsInline
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
