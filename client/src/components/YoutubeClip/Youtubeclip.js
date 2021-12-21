import React from "react";
import * as styles from "./youtubeclip.module.css";

const Youtubeclip = ({ data }) => {
  let videoID = data.videoUrl.substring(data.videoUrl.length - 11);

  return (
    <div className={styles.videoWrapper}>
      {!!data.title && <h2>{data.title}</h2>}
      <div className={styles.iframeContainer}>
        <iframe
          className={styles.iframe}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoID}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Youtubeclip;
