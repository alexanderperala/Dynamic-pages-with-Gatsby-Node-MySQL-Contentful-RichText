import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import * as styles from "./footer.module.css";

const Footer = ({ data }) => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerWrapper}>
        <h2 className={styles.title}>{data.title}</h2>
        <h4 className={styles.subTitle}>{data.subTitle}</h4>
        <p className={styles.text}>{data.text}</p>

        <div className={styles.contactInfo}>
          <div className={styles.iconContainer}>
            <a href="https://goo.gl/maps/LShtWzEaMgSn7wBW9" rel="noreferrer" target="_blank">
              <div className={styles.icon}>
                <GatsbyImage
                  alt={data.iconAdress.title}
                  image={data.iconAdress.gatsbyImageData}
                />
              </div>
              <p>{data.adress}</p>
            </a>
          </div>
 
          <div className={styles.iconContainer}>
            <a href="tel:0767688837">
              <div className={styles.icon}>
                <GatsbyImage
                  alt={data.iconPhone.title}
                  image={data.iconPhone.gatsbyImageData}
                />
              </div>
              <p>{data.phone}</p>
            </a>
          </div>

          <div className={styles.iconContainer}>
            <a href="mailto:hej@attbygga.se" >
              <div className={styles.icon}>
                <GatsbyImage
                  alt={data.iconAdress.title}
                  image={data.iconEmail.gatsbyImageData}
                />
              </div>
              <p>{data.email}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
