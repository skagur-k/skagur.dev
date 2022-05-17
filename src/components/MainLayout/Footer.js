import siteMetadata from '@/data/siteMetaData'
import Link from '@/components/Link'
import Logo from '@/components/Logo'
import { useEffect, useState } from 'react'
import SocialIcon from '../SocialIcon'

//TODO: add social icons, center last thing

const Footer = () => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => setMounted(true), [])

	return (
		<footer>
			<hr className='border-t-1 border-solid border-gray-400 border-opacity-30 mt-8' />
			<div className='grid grid-cols-8 items-center py-4'>
				<div className='col-span-0 md:col-span-2 hidden md:flex' />
				<div className='flex mx-auto flex-col space-y-2 items-center col-span-full md:col-span-4'>
					<Link href='/'>
						<Logo size='tiny' weight='medium' />
					</Link>
					<div className='flex justify-items-center items-center space-x-1 text-gray-500 text-sm'>
						<div>{`© ${new Date().getFullYear()}`}</div>
						<div>Nam Hyuck, Kim. All Rights Reserved.</div>
					</div>
				</div>
				{mounted && (
					<div className='col-span-0 md:col-span-2 space-x-4 justify-end hidden md:flex'>
						<SocialIcon
							kind='github'
							size={6}
							href={siteMetadata.github}
						/>
						<SocialIcon
							kind='linkedin'
							size={6}
							href={siteMetadata.github}
						/>
					</div>
				)}
			</div>
		</footer>
	)
}

export default Footer
