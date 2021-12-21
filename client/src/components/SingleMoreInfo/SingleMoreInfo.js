import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import * as styles from "./singleMoreInfo.module.css";

const SingleMoreInfo = ({ data }) => {
  return (
    <div className={styles.moreInfoBody}>
      <div className={styles.moreInfoContainer}>
        <div className={styles.textContainer}>
          <h3>{data.title}</h3>
          <p>{data.information.information}</p>
        </div>
        <div className={styles.imgContainer}>
          <GatsbyImage
            image={data.image.gatsbyImageData}
            alt={data.image.title}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleMoreInfo;
