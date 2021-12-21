import React from "react"
import { GatsbyImage } from "gatsby-plugin-image";
import * as styles from "./MultipleMoreInfo.module.css"

const MultipleMoreInfo = ({ data }) => {

 

  return (
    <div className={styles.moreInfoBody}>
      {data.textAndImage.map( (node) => (
        <div  key={node.id} className={styles.moreInfoContainer}>
          <div className={styles.textContainer}>
            <h3>{node.title}</h3>
            <p>{node.information.information}</p>
          </div>
          <div className={styles.imgContainer}>
            <GatsbyImage image={node.image.gatsbyImageData} alt={node.image.title} />
          </div>
        </div>
      ))}
    </div>
  )
} 

export default MultipleMoreInfo
