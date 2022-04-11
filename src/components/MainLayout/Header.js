import siteMetadata from '@/data/siteMetaData'
import Link from '@/components/Link'
import Logo from '@/components/Logo'
import headerNavLinks from '@/lib/headerNavLinks'
import Switch from '../ThemeToggle'
import SocialIcon from '../SocialIcon'
import MobileMenu from '../MobileMenu'

// TODO: Add hamburger icon & consider headlessui for the drop menu.

const Header = () => {
	return (
		// Header Container
		<header className='flex item-center pt-8 pb-4 sm:py-8 sm:px-0 justify-center sm:justify-between'>
			<div>
				<Link href='/' aria-label={siteMetadata.headerTitle}>
					<Logo size='xl' weight='bold' />
				</Link>
			</div>
			<div className='hidden sm:flex items-center text-lg leading-5'>
				<div className=' items-center sm:flex space-x-4 sm:space-x-10'>
					{headerNavLinks.map((link) => (
						<Link
							key={link.title}
							href={link.href}
							className='items-center text-gray-600 hover:text-amber-600 dark:text-gray-100 dark:hover:text-amber-500  font-bold text-base'>
							{link.title}
						</Link>
					))}
					<div className='flex space-x-4 items-center justify-between'>
						<SocialIcon
							kind='github'
							href={siteMetadata.github}
							size='6'
						/>
						<Switch />
					</div>
				</div>
			</div>
			<div className='flex sm:hidden'>
				<MobileMenu />
			</div>
		</header>
	)
}

export default Header
