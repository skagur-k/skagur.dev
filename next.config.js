/** @type {import('next').NextConfig} */

const { withContentlayer } = require('next-contentlayer')

const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
	// swcMinify: true,
	typescript: {
		ignoreBuildErrors: true,
	},
}

module.exports = withContentlayer({
	// Append the default value with md extensions
	nextConfig,
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/i,
			use: ['@svgr/webpack'],
		})
		return config
	},
})
