// const path = require(`path`)
// const { graphql } = require("gatsby")


// exports.createPages = async ({ graphql, actions }) => {
//     const { createPage } = actions;
//     const res = await graphql(`
//     {
//       allContentfulPages {
//         edges {
//           node {
//             slug
//           }
//         }
//       }
//     }
//   `).then(result => {
//     result.data.blogs.edges.forEach(({ node }) => {
//       createPage({
//         path: `/Pages/${node.slug}`,
//         component: path.resolve(`./src/templates/Pages/index.js`),
//         context: {
//           slug: node.slug,
//         },
//       })
//     })
//   })
// }
