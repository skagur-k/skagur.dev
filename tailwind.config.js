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
			typography: ({ theme }) => {
				const breakout = {
					marginLeft: 0,
					marginRight: 0,
				}

				const fontSize = (size) => {
					const result = theme(`fontSize.${size}`)
					return Array.isArray(result) ? result[0] : result
				}

				return {
					DEFAULT: {
						css: {
							fontSize: theme('fontSize.lg'),
							pre: {
								color: 'var(--prism-foreground-color)',
								backgroundColor:
									'var(--prism-background-color)',
								borderRadius: 'var(--prism-border-radius)',
								boxShadow: theme('boxShadow.lg'),
							},
							img: {
								// images are wrapped in <p>, which already has margin
								marginTop: 0,
								marginBottom: 0,
								borderRadius: theme('borderRadius.lg'),
							},
							blockquote: {
								fontWeight: theme('fontWeight.normal'),
								backgroundColor:
									'var(--prism-background-color)',
								color: 'var(--prism-foreground-color)',
								borderRadius: theme('borderRadius.xl'),
								padding: theme('spacing.2'),
								marginTop: 0,
								marginBottom: theme('spacing.4'),
								boxShadow: theme('boxShadow.lg'),
							},
							'blockquote > :last-child': {
								marginBottom: theme('spacing.4'),
							},
							'blockquote > p': {
								marginTop: theme('spacing.4'),
							},
							ul: {
								marginTop: 0,
								marginBottom: theme('spacing.8'),
							},
							ol: {
								marginTop: 0,
								marginBottom: theme('spacing.8'),
							},
						},
					},
				}
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
