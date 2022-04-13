import siteMetadata from '@/data/siteMetaData'
import Link from '@/components/Link'
import SocialIcon from '@/components/SocialIcon'
import Logo from '@/components/Logo'
import { useEffect, useState } from 'react'

//TODO: add social icons, center last thing

const Footer = () => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => setMounted(true), [])

	return (
		<footer>
			<hr className='border-t-1 border-solid border-gray-400 border-opacity-30' />
			<div className='grid grid-cols-8 items-center py-8'>
				<div className='col-span-0 md:col-span-2 hidden md:flex' />
				<div className='flex mx-auto flex-col space-y-2 items-center col-span-full md:col-span-4'>
					<Link href='/'>
						<Logo size='tiny' weight='medium' />
					</Link>
					<div className='flex justify-items-center items-center space-x-1 text-gray-500 text-tiny'>
						<div>{`© ${new Date().getFullYear()}`}</div>
						<div>namhyuck.james@gmail.com</div>
					</div>
				</div>
				{mounted && (
					<div className='col-span-0 md:col-span-2 space-x-4 justify-end hidden md:flex'>
						<SocialIcon
							kind='github'
							href={siteMetadata.github}
							size={6}
						/>
						<SocialIcon
							kind='linkedin'
							href={siteMetadata.github}
							size={6}
						/>
					</div>
				)}
			</div>
		</footer>
	)
}

export default Footer
