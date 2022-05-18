import Header from './Header'
import Footer from './Footer'
import ScrollToTopButton from '../ScrollToTop'
import { createContext } from 'react'
import { ToastContainer } from 'react-toastify'
export const AppContext = createContext({
	ghmeta: null,
	setmeta: (ghmeta) => {},
})

const Layout = ({ children }) => {
	return (
		<div className='max-w-2xl sm:max-w-4xl mx-auto px-6 sm:px-4 flex flex-col min-h-screen '>
			<Header />
			<AppContext.Provider value=''>
				<main className='mt-4 mb-auto'>{children}</main>
			</AppContext.Provider>
			<Footer />
			<ScrollToTopButton />
			<ToastContainer limit={1} />
		</div>
	)
}

export default Layout
