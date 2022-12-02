import React, { useContext } from "react"
import { graphql, HeadFC } from "gatsby"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { ThemeContext } from "../context/ThemeContext"

const listStyles = {
  marginBottom: 96,
  paddingLeft: 0,
}
const listItemStyles = {
  fontWeight: 300,
  fontSize: 24,
  maxWidth: 560,
  marginBottom: 30,
}
const linkStyles = {
  textDecoration: "none"
}

const badgeStyle = {
  color: "#fff",
  backgroundColor: "#088413",
  border: "1px solid #088413",
  fontSize: 11,
  fontWeight: "bold",
  letterSpacing: 1,
  borderRadius: 4,
  padding: "4px 6px",
  display: "inline-block",
  position: "relative" as "relative",
  top: -2,
  marginLeft: 10,
  lineHeight: 1,
}

interface Posts {
  frontmatter: {
    badge?: Boolean,
    color: string,
    slug: string,
    title: string,
  }
  id: string
}

interface Props {
  data: {
    allMarkdownRemark: {
      nodes: Posts[]
    }
  }
}

export default function IndexPage({ data }: Props) {
  const { theme } = useContext(ThemeContext)
  const posts = data.allMarkdownRemark.nodes
  return (
    <Layout>
      <ul style={listStyles}>
        {posts.map(({ frontmatter, id }) => (
          <li key={id} style={{ ...listItemStyles, color: frontmatter.color }}>
            <span>
              <Link to={frontmatter.slug} style={{ ...linkStyles, color: theme === 'light' ? "#232129" : "#FFFFFF" }}>{frontmatter.title}</Link>
              {frontmatter.badge && (
                <span style={badgeStyle} aria-label="New Badge">
                  NEW!
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const query = graphql`
query PostsQuery {
  allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
    nodes {
      frontmatter {
        slug
        title
        color
        badge
      }
      id
    }
  }
}
`

export const Head: HeadFC = () => <title>Home Page</title>
