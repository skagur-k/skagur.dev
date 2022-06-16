/** @type {import('next').NextConfig} */

const { withContentlayer } = require('next-contentlayer')

const nextConfig = {
	reactStrictMode: true,
	webpack5: true,
	swcMinify: true,
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
	typescript: {
		ignoreBuildErrors: true,
	},
}

module.exports = withContentlayer({
	nextConfig,
	async redirects() {
		return [
			{
				source: '/project/:path*',
				destination: '/',
				permanent: true,
			},
			{
				source: '/github',
				destination: 'https://github.com/skagur-k/',
				permanent: true,
			},
		]
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg?$/,
			oneOf: [
				{
					use: [
						{
							loader: '@svgr/webpack',
							options: {
								prettier: false,
								svgo: true,
								svgoConfig: {
									plugins: [{ removeViewBox: false }],
								},
								titleProp: true,
							},
						},
					],
					issuer: {
						and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
					},
				},
			],
		})
		return config
	},
	images: {
		domains: ['avatars.githubusercontent.com', 'img.shields.io'],
		formats: ['image/avif', 'image/webp'],
	},
})
