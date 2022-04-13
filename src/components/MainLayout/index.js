import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
	return (
		<div className='max-w-2xl md:max-w-3xl mx-auto md:px-4 '>
			<div className='flex flex-col min-h-screen'>
				<Header />
				<main className='mt-4 mb-auto'>{children}</main>
				<Footer />
			</div>
		</div>
	)
}

export default Layout
