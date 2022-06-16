import profilepic from '@/public/static/images/profilepic.jpg'
import Image from 'next/image'
import { BsFileEarmarkPost } from 'react-icons/bs'
import { SiGithub } from 'react-icons/si'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetaData'

function Hero() {
	return (
		<div className='flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row justify-between sm:items-center'>
			<div className='space-y-4 max-w-lg'>
				<h1 className='gradient-text text-4xl sm:text-4xl font-black'>
					Nam Hyuck Kim
				</h1>
				<div className='space-y-2 font-mono text-gray-300 text-md'>
					<p>Developer based in Seoul, Korea.</p>
					<p>
						Exploring the endless world of technologies, appreciating the road
						it leads me to.
					</p>
				</div>
				<div className='flex space-x-6 text-gray-400'>
					<Link href='#'>
						<div className='flex items-center space-x-2 hover:text-sky-500 hover:ring-2 ring-sky-500 px-2 py-1 rounded-2xl transition-all duration-300'>
							<BsFileEarmarkPost className='w-4 h-4' />
							<p>Resume</p>
						</div>
					</Link>
					<Link href={siteMetadata.github}>
						<div className='flex items-center space-x-2 hover:text-sky-500 hover:ring-2 ring-sky-500 px-2 py-1 rounded-2xl transition-all duration-300'>
							<SiGithub className='w-4 h-4' />
							<p>GitHub</p>
						</div>
					</Link>
				</div>
			</div>
			<div className=''>
				<Image
					src={profilepic}
					alt='profile picture'
					layout='fixed'
					width='120px'
					height='120px'
					className='rounded-full shadow-lg'
				/>
			</div>
		</div>
	)
}

export default Hero
