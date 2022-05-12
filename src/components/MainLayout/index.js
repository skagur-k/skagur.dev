import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
	return (
		<div className=' max-w-4xl mx-auto px-4 lg:px-0 flex flex-col min-h-screen'>
			<Header />
			<main className='mt-8 mb-auto'>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
