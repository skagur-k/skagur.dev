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
			sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
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
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						'pre, code': {
							fontFamily: 'JetBrains Mono',
							fontSize: theme('fontSize.base'),
						},
						pre: {
							borderRadius: theme('borderRadius.xl'),
							'&:hover': {
								// boxShadow: theme('boxShadow.md'),
							},
						},
						'.code-line': {
							'&:hover': {
								boxShadow: theme('boxShadow.md'),
							},
						},
						'--tw-prose-code': theme('colors.amber[500]'),
						'--tw-prose-pre-code': theme('colors.gray[800]'),
						'--tw-prose-pre-bg': theme('colors.gray[100]'),
						'--tw-prose-invert-code': theme('colors.amber[500]'),
						'--tw-prose-invert-pre-code': theme('colors.gray[100]'),
						'--tw-prose-invert-pre-bg': theme('colors.gray[600]'),
					},
				},
				pink: {
					css: {
						'--tw-prose-body': theme('colors.pink[800]'),
						'--tw-prose-headings': theme('colors.pink[900]'),
						'--tw-prose-lead': theme('colors.pink[700]'),
						'--tw-prose-links': theme('colors.pink[900]'),
						'--tw-prose-bold': theme('colors.pink[900]'),
						'--tw-prose-counters': theme('colors.pink[600]'),
						'--tw-prose-bullets': theme('colors.pink[400]'),
						'--tw-prose-hr': theme('colors.pink[300]'),
						'--tw-prose-quotes': theme('colors.pink[900]'),
						'--tw-prose-quote-borders': theme('colors.pink[300]'),
						'--tw-prose-captions': theme('colors.pink[700]'),
						'--tw-prose-code': theme('colors.pink[900]'),
						'--tw-prose-pre-code': theme('colors.pink[100]'),
						'--tw-prose-pre-bg': theme('colors.pink[900]'),
						'--tw-prose-th-borders': theme('colors.pink[300]'),
						'--tw-prose-td-borders': theme('colors.pink[200]'),
						'--tw-prose-invert-body': theme('colors.pink[200]'),
						'--tw-prose-invert-headings': theme('colors.white'),
						'--tw-prose-invert-lead': theme('colors.pink[300]'),
						'--tw-prose-invert-links': theme('colors.white'),
						'--tw-prose-invert-bold': theme('colors.white'),
						'--tw-prose-invert-counters': theme('colors.pink[400]'),
						'--tw-prose-invert-bullets': theme('colors.pink[600]'),
						'--tw-prose-invert-hr': theme('colors.pink[700]'),
						'--tw-prose-invert-quotes': theme('colors.pink[100]'),
						'--tw-prose-invert-quote-borders':
							theme('colors.pink[700]'),
						'--tw-prose-invert-captions': theme('colors.pink[400]'),
						'--tw-prose-invert-code': theme('colors.white'),
						'--tw-prose-invert-pre-code': theme('colors.pink[300]'),
						'--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
						'--tw-prose-invert-th-borders':
							theme('colors.pink[600]'),
						'--tw-prose-invert-td-borders':
							theme('colors.pink[700]'),
					},
				},
			}),
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
