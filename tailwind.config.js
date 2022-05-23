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
		fontFamily: {
			sans: ['"Inter"', 'Noto Sans KR', ...defaultTheme.fontFamily.sans],
			kr: ['"Noto Sans KR"'],
			serif: ['Georgia', ...defaultTheme.fontFamily.serif],
			mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
		},
		extend: {
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
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
