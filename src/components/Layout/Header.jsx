import siteMetadata from '@/data/siteMetaData'
import Link from '@/components/Link'
import Logo from '@/components/Logo'
import headerNavLinks from '@/lib/headerNavLinks'
import Switch from '../ThemeToggle'
import HamburgerMenu from '../HamburgerMenu'
import { useRouter } from 'next/router'
import useReadingProgress from '@/lib/utils/useReadingProgress'

// TODO: Add hamburger icon & consider headlessui for the drop menu.

function NavItem({ href, text }) {
	const router = useRouter()
	const isActive = router.asPath === href

	return (
		<li>
			<Link
				href={href}
				className={`hover:text-amber-500 font-medium ${
					isActive ? 'text-amber-500' : ''
				}`}>
				{text}
			</Link>
		</li>
	)
}

const Header = () => {
	const router = useRouter()
	const isPost = router.asPath.startsWith('/blog/') ? true : false

	const completion = useReadingProgress()

	const inlineStyle = {
		width: `${completion}%`,
	}

	return (
		<header className='relative flex item-center py-8 md:px-0 justify-between'>
			<div className='flex items-center'>
				<Link href='/' aria-label={siteMetadata.headerTitle}>
					<div className='items-center'>
						<h1 className={`inline-block text-xl font-bold`}>
							<span className='text-amber-500'>&lt;&nbsp;&nbsp;</span>
							skagur.dev
							<span className='text-amber-500'>&nbsp;/&nbsp;&gt;</span>
						</h1>
					</div>
				</Link>
			</div>
			<div className='hidden sm:hidden'>
				<nav className='flex items-center space-x-8'>
					{headerNavLinks.map((link) => (
						<NavItem key={link.title} href={link.href} text={link.title} />
					))}
					<Switch />
				</nav>
			</div>
			<nav className='flex space-x-6'>
				<Switch />

				<HamburgerMenu />
			</nav>
			{isPost && (
				<span
					style={inlineStyle}
					className={`fixed bg-yellow-500 dark:bg-sky-500 h-1 left-0 top-0`}
				/>
			)}
		</header>
	)
}

export default Header
