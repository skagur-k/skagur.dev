/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
}
module.exports = {
	// Append the default value with md extensions
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	nextConfig,
	swcMinify: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/i,
			use: ['@svgr/webpack'],
		})
		return config
	},
}
