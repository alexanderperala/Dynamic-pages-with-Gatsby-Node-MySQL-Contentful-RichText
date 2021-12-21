import React from "react";
import * as styles from "./partner.module.css";
import { GatsbyImage } from "gatsby-plugin-image";

const Partners = ({ data }) => {
  

  return (
    <div className={styles.contentWrapper}>
      <h3 className={styles.title}>{data.text}</h3>
      <div className={styles.images}>
        {data.images.map((node, index) => (
          <div key={index} className={styles.list}>
            <GatsbyImage image={node.gatsbyImageData} alt="logotype" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
