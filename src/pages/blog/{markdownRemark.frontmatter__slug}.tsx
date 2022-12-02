import React, { useContext } from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import { ThemeContext } from "../../context/ThemeContext"

type Post = {
    data: {
        markdownRemark: {
            frontmatter: {
                date: string,
                slug: string,
                title: string
            },
            html: string
        }
    }
}

export default function BlogPostTemplate({ data }: Post) {
    const { theme } = useContext(ThemeContext)
    const { markdownRemark } = data
    const { frontmatter, html } = markdownRemark
    return (
        <Layout>
            <>
                <h1 style={{ color: theme === 'light' ? "#232129" : "#FFFFFF" }}>{frontmatter.title}</h1>
                <h3 style={{ color: theme === 'light' ? "#232129" : "#FFFFFF" }}>{frontmatter.date}</h3>
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
      }
    }
  }
`