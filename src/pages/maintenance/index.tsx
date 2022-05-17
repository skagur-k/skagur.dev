import Logo from '@/components/Logo'
import SocialIcon from '@/components/SocialIcon'
import siteMetadata from '@/data/siteMetaData'
import { SiGithub, SiLinkedin, SiMaildotru } from 'react-icons/si'
import Link from '@/components/Link'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const MaintenancePage = (): JSX.Element => {
	return (
		<div className='flex flex-col justify-center bg-gray-900 min-h-screen text-center space-y-12'>
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

function ContactModal() {
	let [isOpen, setIsOpen] = useState(true)
	let [isCopied, setIsCopied] = useState(false)

	function closeModal() {
		setIsOpen(false)
		setIsCopied(false)
	}

	function openModal() {
		setIsOpen(true)
	}

	return (
		<>
			<div className='flex items-center justify-center'>
				<button
					type='button'
					className='inline-flex justify-center rounded-md border border-transparent bg-slate-700 px-4 py-2 font-semibold text-white hover:bg-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
					onClick={openModal}>
					Contact Me
				</button>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as='div'
					className='relative z-10'
					onClose={() => {
						closeModal()
					}}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'>
								<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
									<Dialog.Title
										as='h3'
										className='text-lg font-bold leading-6 text-gray-900'>
										Contacts
									</Dialog.Title>
									<div className='mt-4 space-y-4 text-gray-800'>
										<Link
											href={siteMetadata.github}
											className='-ml-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out  hover:bg-slate-500 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-50'>
											<div className='flex h-10 w-10 shrink-0 items-center justify-center'>
												<SiGithub className='mr-2 w-10 h-10' />
											</div>
											<div className='ml-4'>
												<p className='text-sm font-semibold'>
													GitHub
												</p>
												<p className='text-sm'>
													{siteMetadata.github}
												</p>
											</div>
										</Link>
										<Link
											href={siteMetadata.linkedin}
											className='-ml-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-slate-500 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-50'>
											<div className='flex h-10 w-10 shrink-0 items-center justify-center'>
												<SiLinkedin className='mr-2 w-10 h-10' />
											</div>
											<div className='ml-4'>
												<p className='text-sm font-semibold'>
													LinkedIn
												</p>
												<p className='text-sm'>
													{siteMetadata.linkedin}
												</p>
											</div>
										</Link>
										<button
											onClick={() => {
												copyToClipBoard(
													siteMetadata.email
												)
												setIsCopied(true)
											}}
											className='-ml-3 w-full text-left flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-slate-500 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-50'>
											<div className='flex h-10 w-10 shrink-0 items-center justify-center '>
												<SiMaildotru className='mr-2 w-10 h-10' />
											</div>
											<div className='flex items-center justify-between'>
												<div className='ml-4'>
													<p className='text-sm font-semibold'>
														Email
													</p>
													<div className=''>
														<p className='text-sm'>
															{siteMetadata.email}
														</p>
													</div>
												</div>
												{isCopied ? (
													<p className='text-xs font-semibold'>
														Copied!
													</p>
												) : (
													''
												)}
											</div>
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

function copyToClipBoard(email: string) {
	navigator.clipboard.writeText(email)
}

export default MaintenancePage
