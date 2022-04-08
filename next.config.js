const theme = require("shiki/themes/github-dark.json")
const { remarkCodeHike } = require("@code-hike/mdx")

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
}
// TODO: install gray-matter remark-frontmatter @code-hike/mdx@next
// https://codehike.org/docs/installation

const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [
            [remarkCodeHike, { theme, lineNumbers: true }],
        ],
        rehypePlugins: [],
        // If you use `MDXProvider`, uncomment the following line.
        // providerImportSource: "@mdx-js/react",
    },
})

module.exports = withMDX({
    // Append the default value with md extensions
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    nextConfig,
    swcMinify: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        })
        return config
    },
})
