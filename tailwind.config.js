const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const theme = require('tailwindcss/defaultTheme')

module.exports = {
	content: [
		'./src/pages/**/*.{js,jsx,ts,tsx}',
		'./src/components/**/*.{js,jsx,ts,tsx}',
	],
	darkMode: 'class',
	theme: {
		fontSize: {
			xs: '.75rem',
			sm: '.875rem',
			tiny: '.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '4rem',
			'7xl': '5rem',
		},
		extend: {
			height: {
				pnf: 'calc(60vh)', //page-not-found height
			},
			colors: {
				transparent: 'transparent',
				current: 'currentcolor',
				gray: {
					0: '#fff',
					100: '#fafafa',
					200: '#eaeaea',
					300: '#999999',
					400: '#888888',
					500: '#666666',
					600: '#444444',
					700: '#333333',
					800: '#222222',
					900: '#111111',
				},
			},
			fontFamily: {
				sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
				serif: ['Georgia', ...defaultTheme.fontFamily.serif],
				mono: ['ui-monospace', 'SFMono-Regular'],
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
