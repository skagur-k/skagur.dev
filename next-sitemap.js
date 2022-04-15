/** @type {import('next-sitemap').IConfig} */

module.exports = {
	siteUrl: process.env.SITE_URL || 'https://skagur.dev',
	generateRobotsTxt: true, // (optional)
	// ...other options
}
