import siteMetadata from '@/data/siteMetaData'
import Link from '@/components/Link'
import { useEffect, useState } from 'react'
import { SiGithub, SiLinkedin } from 'react-icons/si'

const Footer = () => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => setMounted(true), [])

	return (
		<footer>
			<hr className='border-t-1 border-solid border-gray-400 border-opacity-30 mt-8' />
			<div className='grid grid-cols-8 items-center py-4'>
				<div className='col-span-0 sm:col-span-2 hidden sm:flex' />
				<div className='flex mx-auto flex-col space-y-2 items-center col-span-full sm:col-span-4'>
					<Link href='/'>
						<div className='items-center'>
							<h1 className={`inline-block text-tiny font-semibold`}>
								<span className='text-amber-500'>&lt;&nbsp;&nbsp;</span>
								skagur.dev
								<span className='text-amber-500'>&nbsp;/&nbsp;&gt;</span>
							</h1>
						</div>
					</Link>
					<div className='flex justify-items-center items-center space-x-1 text-gray-500 text-sm'>
						<div>{`© ${new Date().getFullYear()}`}</div>
						<div>Nam Hyuck, Kim. All Rights Reserved.</div>
					</div>
				</div>
				{mounted && (
					<div className='col-span-0 sm:col-span-2 space-x-4 justify-end hidden sm:flex'>
						<Link href={siteMetadata.github}>
							<SiGithub className={`w-6 h-6  hover:text-amber-500 transition-color duration-300`} />
						</Link>
						<Link href={siteMetadata.linkedin}>
							<SiLinkedin className={`w-6 h-6  hover:text-amber-500 transition-color duration-300`} />
						</Link>
					</div>
				)}
			</div>
		</footer>
	)
}

export default Footer
