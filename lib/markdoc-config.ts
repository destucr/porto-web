import { Config, nodes, Tag } from "@markdoc/markdoc"

export const markdocConfig: Config = {
  nodes: {
    fence: {
      render: "CodeBlock",
      attributes: {
        language: {
          type: String,
          description: "The programming language of the code block",
        },
      },
      transform(node) {
        const language = node.attributes.language || "text"
        const content = node.children.length
          ? node.children[0].attributes.content
          : ""

        return new Tag("CodeBlock", { language }, [content])
      },
    },
    code: {
      render: "InlineCode",
      transform(node) {
        const content = node.children.length
          ? node.children[0].attributes.content
          : ""
        return new Tag("InlineCode", {}, [content])
      },
    },
    image: {
      render: "Image",
      attributes: {
        src: { type: String, required: true },
        alt: { type: String },
        title: { type: String },
      },
    },
    heading: nodes.heading,
    paragraph: nodes.paragraph,
    list: nodes.list,
    item: nodes.item,
    strong: nodes.strong,
    em: nodes.em,
    link: nodes.link,
    blockquote: nodes.blockquote,
    hr: nodes.hr,
  },
}
