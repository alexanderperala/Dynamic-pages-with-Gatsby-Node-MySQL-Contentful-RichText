import * as React from "react";
import * as styles from "./header.module.css";
import BackgroundImage from "gatsby-background-image";

const Header = ({ data }) => {
  const scrollOnClick = e => {
    e.preventDefault();

    window.scrollTo({
      top: 1850,
      behavior: "smooth",
    });
  };

  return (
    <BackgroundImage
      Tag="section"
      className={styles.header}
      fluid={data.image.fluid}
      backgroundColor={`#040e18`}
    >
      <div className={styles.textContainer}>
        <h3>{data.slogan}</h3>
        {!!data.buttonLabel && (
          <button onClick={e => scrollOnClick(e)}>{data.buttonLabel}</button>
        )}
      </div>
    </BackgroundImage>
  );
};

export default Header;
