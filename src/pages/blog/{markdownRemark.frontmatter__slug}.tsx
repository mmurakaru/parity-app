import React, { useContext } from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import { ThemeContext } from "../../context/ThemeContext"
import { GatsbyImage } from "gatsby-plugin-image"

type Image = {
    sizes: string,
    src?: string,
    srcSet: string
    type?: string
}

interface FeaturedImage {
    childImageSharp: {
        gatsbyImageData: {
            backgroundColor: string,
            height: number,
            images: {
                fallback: Image,
                sources: Image[]
            },
            layout: string,
            width: number
        }
    }
}

interface Post {
    data: {
        markdownRemark: {
            frontmatter: {
                date: string,
                slug: string,
                title: string,
                featuredImgAlt: string
            },
            html: string,
            featuredImg: FeaturedImage
        }
    }
}

export default function BlogPostTemplate({ data }: Post) {
    const { theme } = useContext(ThemeContext)
    const { markdownRemark } = data
    const { frontmatter, html, featuredImg } = markdownRemark
    return (
        <Layout>
            <>
                <h1 style={{ color: theme === 'light' ? "#232129" : "#FFFFFF" }}>{frontmatter.title}</h1>
                <h3 style={{ color: theme === 'light' ? "#232129" : "#FFFFFF" }}>{frontmatter.date}</h3>
                {featuredImg && (
                    <GatsbyImage
                        // @ts-ignore
                        image={
                            featuredImg.childImageSharp.gatsbyImageData
                        }
                        alt={frontmatter.featuredImgAlt}
                    />
                )}
                <div
                    style={{ color: theme === 'light' ? "#232129" : "#FFFFFF" }}
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </>
        </Layout>
    )
}

export const query = graphql`
query PostQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        featuredImgAlt
      }
      featuredImg {
        childImageSharp {
          gatsbyImageData(width: 300)
        }
      }
    }
  }
`