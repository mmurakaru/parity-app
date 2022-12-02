import * as React from "react"
import { graphql, HeadFC } from "gatsby"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
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
  const posts = data.allMarkdownRemark.nodes
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        Parity blog
      </h1>
      <ul style={listStyles}>
        {posts.map(({ frontmatter, id }: any) => (
          <li key={id} style={{ ...listItemStyles, color: frontmatter.color }}>
            <span>
              <Link to={frontmatter.slug}>{frontmatter.title}</Link>
              {frontmatter.badge && (
                <span style={badgeStyle} aria-label="New Badge">
                  NEW!
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <StaticImage
        src="../images/parity-logo-square.png"
        alt="Parity logo"
        placeholder="blurred"
        layout="fixed"
        width={24}
        height={24}
      />
    </main>
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
