import siteMetadata from '@/data/siteMetaData'
import Link, {
	DecoratedLink,
	ExternalLink,
	InternalLink,
} from '@/components/Link'
import TypeIt from 'typeit-react'
import SocialIcon from '@/components/SocialIcon'
import { ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { NextSeo } from 'next-seo'

const Home = () => {
	return (
		<>
			<NextSeo />
			<div className='flex flex-col mt-0 md:mt-12 space-y-8'>
				<h1 className='text-xl md:text-4xl font-bold'>
					Hi, I am{' '}
					<span className='underline underline-offset-8 decoration-wavy decoration-amber-500'>
						Nam Hyuck Kim
					</span>
				</h1>
				<h2 className='text-md md:text-lg'>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Assumenda eos sequi earum, aperiam ipsa rem maiores quaerat
					perferendis beatae
					<ExternalLink href='https://google.com'>
						Google
					</ExternalLink>
					itaque nemo nostrum eligendi distinctio voluptas inventore
					officia laboriosam dolore expedita.
				</h2>
				<div className='flex justify-between'>
					<div className='hidden md:flex space-x-4 items-center justify-center md:justify-start'>
						<SocialIcon
							kind='github'
							href={siteMetadata.github}
							size={8}
						/>
						<SocialIcon
							kind='linkedin'
							href={siteMetadata.linkedin}
							size={8}
						/>
					</div>
					<InternalLink href='/about'>
						Learn More About Me
					</InternalLink>
				</div>
				<InternalLink href='/about'>Learn More About Me</InternalLink>
			</div>
		</>
	)
}

export default Home
