import Header from './Header'
import Footer from './Footer'
import ScrollToTopButton from '../ScrollToTop'
import { ToastContainer } from 'react-toastify'

const Layout = ({ children }) => {
	return (
		<div className='max-w-2xl sm:max-w-4xl mx-auto px-6 sm:px-4 flex flex-col min-h-screen '>
			<Header />
			<main className='mt-4 mb-auto'>{children}</main>
			<Footer />
			<ScrollToTopButton />
			<ToastContainer limit={1} />
		</div>
	)
}

export default Layout
