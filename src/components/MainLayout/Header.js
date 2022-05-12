import siteMetadata from '@/data/siteMetaData'
import Link from '@/components/Link'
import Logo from '@/components/Logo'
import headerNavLinks from '@/lib/headerNavLinks'
import Switch from '../ThemeToggle'
import MobileMenu from '../MobileMenu'
import { useRouter } from 'next/router'

// TODO: Add hamburger icon & consider headlessui for the drop menu.

function NavItem({ href, text }) {
	const router = useRouter()
	const isActive = router.asPath === href

	return (
		<Link
			href={href}
			className={`hover:text-amber-500 font-medium ${
				isActive ? 'text-amber-500' : ''
			}`}>
			{text}
		</Link>
	)
}

const Header = () => {
	return (
		<header className='flex item-center py-8 px-4 md:px-0 justify-between'>
			<div className='flex items-center'>
				<Link href='/' aria-label={siteMetadata.headerTitle}>
					<Logo size='xl' weight='bold' />
				</Link>
			</div>
			<div className='hidden md:flex'>
				<div className='flex items-center space-x-8'>
					{headerNavLinks.map((link) => (
						<NavItem
							key={link.title}
							href={link.href}
							text={link.title}
						/>
					))}
					<Switch />
				</div>
			</div>
			<div className='flex md:hidden'>
				<MobileMenu />
			</div>
		</header>
	)
}

export default Header
