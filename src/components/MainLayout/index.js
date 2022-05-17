import Header from './Header'
import Footer from './Footer'
import ScrollToTopButton from '../ScrollToTop'

const Layout = ({ children }) => {
	return (
		<div className='max-w-2xl sm:max-w-4xl mx-auto px-6 sm:px-4 flex flex-col min-h-screen '>
			<Header />
			<main className='mt-4 mb-auto'>{children}</main>
			<Footer />
			<ScrollToTopButton />
		</div>
	)
}

export default Layout
