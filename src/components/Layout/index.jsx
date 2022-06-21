import Header from './Header'
import Footer from './Footer'
import ScrollToTopButton from '../ScrollToTop'
import { Toaster } from 'react-hot-toast'

const Layout = ({ children }) => {
	return (
		<div className='max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-0 flex flex-col min-h-screen'>
			<Header />
			<main className='mt-4 mb-auto'>{children}</main>
			<Footer />
			<ScrollToTopButton />
			<Toaster />
		</div>
	)
}

export default Layout
