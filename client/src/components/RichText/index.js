import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { GatsbyImage } from "gatsby-plugin-image"

import Footer from "../Footer/Footer"
import ContactForm from "../ContactForm/ContactForm"
import Partners from "../Partners/Partners"
import MultipleMoreInfo from "../MultipleMoreInfo/MultipleMoreInfo"
import SingleMoreInfo from "../SingleMoreInfo/SingleMoreInfo"
import Header from "../Header/Header"
import Navigationbar from "../Navbar/Navbar"
import Youtubeclip from "../YoutubeClip/Youtubeclip"
import ImageCarousel from "../ImageCarousel/ImageCarousel"
import * as styles from "./richText.module.css"


export const RichText = ({ raw, references = [] }) => {
  const referencesMap = {}

  references.forEach(reference => {
    referencesMap[reference.contentful_id] = reference
  })

  const options = {
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        return <a href={node.data.uri}>{children}</a>
      },
      [BLOCKS.HEADING_1]: (node, children) => {
        return <h1 className={styles.centerHeading}>{children}</h1>
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return <h2 className={styles.centerHeading}>{children}</h2>
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return <h3 className={styles.centerHeading}>{children}</h3>
      },
      [BLOCKS.HEADING_4]: (node, children) => {
        return <h4 className={styles.centerHeading}>{children}</h4>
      },
      [BLOCKS.HEADING_5]: (node, children) => {
        return <h5 className={styles.centerHeading}>{children}</h5>
      },
      [BLOCKS.HEADING_6]: (node, children) => {
        return <h6 className={styles.centerHeading}>{children}</h6>
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <p className={styles.centerParagraph}>{children}</p>
      },
      [BLOCKS.OL_LIST]: node => {
        return (
          <ol>
            {node.content.map(item => (
              <li key={node.id}>{item.content[0].content[0].value}</li>
            ))}
          </ol>
        )
      },
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const data = referencesMap[node.data.target.sys.id]
        return (
          <div className={styles.centerImg}>
            <GatsbyImage
              className={styles.centerImg}
              alt={data.title}
              image={data.gatsbyImageData}
            />
          </div>
        )
      },
      [BLOCKS.QUOTE]: (node, children) => {
        return <blockquote>{children}</blockquote>
      },
      [BLOCKS.HR]: (node, children) => {
        return <hr />
      },
      [BLOCKS.EMBEDDED_ENTRY]: node => {
        const data = referencesMap[node.data.target.sys.id]

        switch (data.__typename) {
          case "ContentfulYouTubeClip":
            return <Youtubeclip data={data} />

          case "ContentfulNavbar":
            return <Navigationbar data={data} />

          case "ContentfulHeader":
            return <Header data={data} />

          case "ContentfulInformationWithImage":
            return <SingleMoreInfo data={data} />

          case "ContentfulMultipleInformationWImages":
            return <MultipleMoreInfo data={data} />

          case "ContentfulRowWithImages":
            return <Partners data={data} />

          case "ContentfulForm":
            return <ContactForm data={data} />

          case "ContentfulFooter":
            return <Footer data={data} />

          case "ContentfulSliderOfImages":
            return <ImageCarousel data={data} />

          default:
            return null
        }
      },
    },
  }

  return (
    <div className="richTextWrapper">
      {documentToReactComponents(JSON.parse(raw), options)}
    </div>
  )
}
