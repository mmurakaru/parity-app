const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    createTypes(`
    type MarkdownRemark implements Node {
        frontmatter: Frontmatter
        featuredImg: File @link(from: "fields.localFile")
    }

    type Frontmatter {
        title: String!
        featuredImgUrl: String
        featuredImgAlt: String
    }
  `)
}

exports.onCreateNode = async ({
    node,
    actions: { createNode, createNodeField },
    createNodeId,
    getCache,
}) => {
    if (
        node.internal.type === "MarkdownRemark" &&
        node.frontmatter.featuredImgUrl !== null
    ) {
        const fileNode = await createRemoteFileNode({
            url: node.frontmatter.featuredImgUrl,
            parentNodeId: node.id,
            createNode,
            createNodeId,
            getCache,
        })

        if (fileNode) {
            createNodeField({ node, name: "localFile", value: fileNode.id })
        }
    }
}