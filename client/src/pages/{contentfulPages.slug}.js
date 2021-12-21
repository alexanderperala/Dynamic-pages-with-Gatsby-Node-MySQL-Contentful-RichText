import React from "react";
import Layout from "../components/Layout";
import { RichText } from "../components/RichText";
import { graphql } from "gatsby";
import Seo from "../components/seo";

export default function ContentfulPages(data) {
  return (
    <Layout>
      <Seo
        title={data.data.contentfulPages.title}
        description={data.data.contentfulPages.description}
      />
      {!!data.data.contentfulPages.pageContent && (
        <RichText
          references={data.data.contentfulPages.pageContent.references}
          raw={data.data.contentfulPages.pageContent.raw}
        />
      )}
    </Layout>
  );
}

export const query = graphql`
  query ($slug: String!) {
    contentfulPages(slug: { eq: $slug }) {
      id
      title
      description
      pageContent {
        raw
        references {
          ... on Node {
            ... on ContentfulAsset {
              contentful_id
              title
              gatsbyImageData(quality: 100, placeholder: BLURRED, width: 400)
            }
          }
          ... on Node {
            ... on ContentfulFooter {
              __typename
              contentful_id
              id
              email
              adress
              phone
              phoneLabel
              adressLabel
              iconAdress {
                title
                gatsbyImageData(
                  placeholder: BLURRED
                  resizingBehavior: SCALE
                  height: 25
                  width: 25
                )
              }
              iconEmail {
                title
                gatsbyImageData(
                  placeholder: BLURRED
                  resizingBehavior: SCALE
                  height: 30
                  width: 30
                )
              }
              iconPhone {
                title
                gatsbyImageData(
                  placeholder: BLURRED
                  resizingBehavior: SCALE
                  height: 30
                  width: 30
                )
              }
              subTitle
              title
            }
          }
          ... on Node {
            ... on ContentfulForm {
              __typename
              contentful_id
              id
              labelInput1
              labelInput2
              labelInput3
              subTitle
              title
            }
          }
          ... on Node {
            ... on ContentfulRowWithImages {
              __typename
              contentful_id
              id
              images {
                title
                gatsbyImageData(placeholder: BLURRED)
              }
              text
            }
          }
          ... on Node {
            ... on ContentfulMultipleInformationWImages {
              __typename
              id
              contentful_id
              textAndImage {
                title
                id
                image {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    placeholder: BLURRED
                    resizingBehavior: SCALE
                    aspectRatio: 1.5
                    height: 300
                    width: 300
                  )
                  title
                }
                information {
                  information
                }
              }
            }
          }
          ... on Node {
            ... on ContentfulInformationWithImage {
              __typename
              contentful_id
              id
              title
              image {
                gatsbyImageData(
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  resizingBehavior: SCALE
                  aspectRatio: 1.5
                  height: 300
                  width: 300
                )
              }
              information {
                information
              }
            }
          }
          ... on Node {
            ... on ContentfulHeader {
              __typename
              id
              contentful_id
              image {
                id
                fluid(quality: 100) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
              slogan
              buttonLabel
            }
          }
          ... on Node {
            ... on ContentfulNavbar {
              __typename
              contentful_id
              logoType {
                gatsbyImageData(placeholder: BLURRED, width: 200)
              }
              navbarItems {
                contentful_id
                label
                page {
                  slug
                }
                subMenuObjects {
                  contentful_id
                  label
                  page {
                    slug
                  }
                }
              }
            }
          }
          ... on Node {
            ... on ContentfulYouTubeClip {
              __typename
              contentful_id
              title
              videoUrl
            }
          }
          ... on Node {
            ... on ContentfulSliderOfImages {
              __typename
              contentful_id
              images {
                gatsbyImageData(
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  resizingBehavior: SCALE
                )
              }
            }
          }
        }
      }
    }
  }
`;
