import { DefaultSeo } from 'next-seo'
import siteMetadata from '@/data/siteMetaData'

const DefaultSEO = (): JSX.Element => {
	return (
		<DefaultSeo
			defaultTitle={siteMetadata.title}
			titleTemplate={`%s - ${siteMetadata.title}`}
			description={siteMetadata.description}
			canonical='https://skagur.dev/'
			additionalMetaTags={[
				{
					property: 'theme-color',
					content: '#0ea5e9',
				},
			]}
			additionalLinkTags={[
				{
					rel: 'manifest',
					href: '/manifest.json',
				},
			]}
			openGraph={{
				type: 'website',
				site_name: 'skagur.dev',
				url: 'https://skagur.dev/',
				title: '[skagur.dev]',
				description: 'Portfolio site designed and developed by Nam Hyuck Kim',
				images: [
					{
						url: '/og-image.webp',
						width: 1200,
						height: 630,
						alt: 'skagur.dev',
					},
				],
			}}
		/>
	)
}

export default DefaultSEO
