import SocialIcon from '@/components/SocialIcon'
import siteMetadata from '@/data/siteMetaData'
import Link, { ExternalLink } from '@/components/Link'

const Home = () => {
	return (
		<div className='flex flex-col justify-center items-center'>
			<div className='flex'>
				<h1 className='text-xl md:text-3xl font-bold'>
					Hi, I am
					<span className='text-amber-500'>&nbsp;&lt;&nbsp;</span>
					Nam Hyuck Kim
					<span className='text-amber-500'>&nbsp;/&gt;</span>
				</h1>
			</div>
			<div>
				This is{' '}
				<ExternalLink href='http://www.google.com'>Google</ExternalLink>
			</div>
		</div>
	)
}

export default Home
