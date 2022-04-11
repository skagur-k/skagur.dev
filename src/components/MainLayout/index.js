import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
	return (
		<div className='max-w-3xl xl:max-w-4xl mx-auto sm:px-6 '>
			<div className='flex flex-col justify-between h-screen'>
				<Header />
				<main className='mt-8 h-full mb-auto px-4 sm:px-0'>
					{children}
				</main>
				<Footer />
			</div>
		</div>
	)
}

export default Layout
