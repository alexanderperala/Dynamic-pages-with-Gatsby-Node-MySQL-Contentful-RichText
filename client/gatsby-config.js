require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: "AttBygga",
    description: `Vi är ett byggföretag med lång erfarenhet och expertis inom byggbranchen och kan allt från vvs till kök. `,
    // siteUrl: `www.siteUrl.se`,
  },
  plugins: [
    `gatsby-transformer-sharp`, `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: process.env.CONTENTFUL_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACEID,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
}
