/** @type {import('next').NextConfig} */

const { withContentlayer } = require('next-contentlayer')

const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
	// swcMinify: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	async redirects() {
		return [
			{
				source: '/github',
				destination: 'https://github.com/skagur-k',
				permanent: true,
			},
		]
	},
}

module.exports = withContentlayer({
	nextConfig,
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/i,
			use: ['@svgr/webpack'],
		})
		return config
	},
	images: {
		domains: ['avatars.githubusercontent.com', 'img.shields.io'],
		formats: ['image/avif', 'image/webp'],
	},
})
