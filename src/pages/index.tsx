import * as React from "react"
import { graphql, HeadFC } from "gatsby"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import darkmodeIcon from "../assets/darkmode-icon.svg"
import lightmodeIcon from "../assets/lightmode-icon.svg"
import { useState } from "react"

const pageStyles = {
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headerStyles = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: 64
}
const headingStyles = {
  margin: '0 30px 0 0',
  maxWidth: 320,
}
const iconStyles = {
  cursor: 'pointer'
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
  const [darkmode, setDarkmode] = useState(false)
  const posts = data.allMarkdownRemark.nodes

  function handleDarkmode() {
    setDarkmode(!darkmode)
  }

  return (
    <main style={{ ...pageStyles, backgroundColor: darkmode ? "#CDCECD" : "#FFFFFF" }}>
      <header style={headerStyles}>
        <h1 style={{ ...headingStyles, color: darkmode ? "#FFFFFF" : "#232129" }}>
          Parity blog
        </h1>
        <img src={darkmode ? lightmodeIcon : darkmodeIcon} style={iconStyles} onClick={handleDarkmode} />
      </header>
      <ul style={listStyles}>
        {posts.map(({ frontmatter, id }) => (
          <li key={id} style={{ ...listItemStyles, color: frontmatter.color }}>
            <span>
              <Link to={frontmatter.slug} style={{ ...linkStyles, color: darkmode ? "#FFFFFF" : "#232129" }}>{frontmatter.title}</Link>
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
