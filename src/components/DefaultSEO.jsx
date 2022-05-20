import { DefaultSeo } from 'next-seo'
import siteMetadata from '@/data/siteMetaData'

const DefaultSEO = () => {
	return (
		<DefaultSeo
			defaultTitle={siteMetadata.title}
			titleTemplate={`%s - ${siteMetadata.title}`}
			description={siteMetadata.description}
			canonical='https://skagur.dev/'
			openGraph={{
				type: 'website',
				site_name: 'skagur.dev',
				url: 'https://skagur.dev/',
				title: '[skagur.dev]',
				description: '',
				images: [
					{
						url: '/og-image.png',
						width: 800,
						height: 420,
						alt: 'skagur.dev',
					},
				],
			}}
		/>
	)
}

export default DefaultSEO
