import ContactModal from '@/components/ContactModal'
import Logo from '@/components/Logo'
import { ToastContainer } from 'react-toastify'

const MaintenancePage = (): JSX.Element => {
	return (
		<div className='flex flex-col justify-center min-h-screen text-center space-y-12'>
			<ToastContainer />
			<Logo size='2xl' weight='bold' />
			<div className='relative flex flex-col text-3xl font-medium'>
				{/* <Construction className='absolute scale-75 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-full' /> */}
				<h1 className='text-2xl z-10'>
					This website is{' '}
					<span className='font-black text-3xl z-10'>UNDER</span>
				</h1>
				<div className='font-black text-4xl text-amber-500'>
					CONSTRUCTION
				</div>
				<hr className='my-4 scale-x-50' />
				<div className='font-black text-2xl'>
					이 사이트는 현재{' '}
					<span className='text-amber-500'>공사중</span>
					입니다.
				</div>
			</div>
			<div className='inline-flex justify-center space-x-10'>
				<ContactModal />
			</div>
		</div>
	)
}

export default MaintenancePage
