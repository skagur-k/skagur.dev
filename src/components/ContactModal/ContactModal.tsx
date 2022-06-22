import siteMetadata from '@/data/siteMetaData'
import { SiGithub, SiLinkedin, SiMaildotru } from 'react-icons/si'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { FiPhoneCall } from 'react-icons/fi'
import { FaRegCopy } from 'react-icons/fa'
import Link from '@/components/Link/Link'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import classNames from 'classnames'

type PropTypes = {
	className: string | undefined
}

export default function ContactModal({ className }: PropTypes): JSX.Element {
	let [isOpen, setIsOpen] = useState(false)
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
			<div className={classNames(className, 'flex items-center justify-center')}>
				<button
					type='button'
					className='inline-flex justify-center rounded-full border border-transparent bg-gray-600 dark:bg-slate-700 p-4 font-semibold text-gray-200 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
					onClick={openModal}
					aria-label='Contacts'>
					<FiPhoneCall className='text-2xl' />
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
									<Dialog.Title as='h3' className='text-lg font-bold leading-6 text-gray-900'>
										Contacts
									</Dialog.Title>
									<div className='mt-4 space-y-4 text-gray-800'>
										<div
											onClick={() => {
												copyToClipBoard(siteMetadata.email)
												setIsCopied(true)
											}}
											className='-ml-3 cursor-pointer flex items-center rounded-lg p-2 transition duration-150 ease-in-out  hover:bg-slate-500 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-50'>
											<div className='flex h-10 w-10 items-center justify-center '>
												<SiMaildotru className='mr-2 w-10 h-10' />
											</div>
											<div className=' flex items-center justify-between w-full'>
												<div className=' ml-4'>
													<p className='text-sm font-semibold'>Email</p>
													<div className=''>
														<p className='text-sm'>{siteMetadata.email}</p>
													</div>
												</div>
												<FaRegCopy className='text-xl mr-2' />
											</div>
										</div>
										<Link
											href={siteMetadata.github}
											className='-ml-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out  hover:bg-slate-500 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-50'>
											<div className='flex h-10 w-10 shrink-0 items-center justify-center'>
												<SiGithub className='mr-2 w-10 h-10' />
											</div>
											<div className='flex justify-between items-center w-full'>
												<div className='ml-4'>
													<p className='text-sm font-semibold'>GitHub</p>
													<p className='text-sm'>{siteMetadata.github}</p>
												</div>
												<FaExternalLinkAlt className='text-base mr-2' />
											</div>
										</Link>
										<Link
											href={siteMetadata.linkedin}
											className='-ml-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-slate-500 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-50'>
											<div className='flex h-10 w-10 shrink-0 items-center justify-center'>
												<SiLinkedin className='mr-2 w-10 h-10' />
											</div>
											<div className='flex justify-between items-center w-full'>
												<div className='ml-4'>
													<p className='text-sm font-semibold'>LinkedIn</p>
													<p className='text-sm'>{siteMetadata.linkedin}</p>
												</div>
												<FaExternalLinkAlt className='text-base mr-2' />
											</div>
										</Link>
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

function copyToClipBoard(text: string): void {
	navigator.clipboard.writeText(text)
	toast.success('Copied!', {
		duration: 2000,
		position: 'bottom-center',
		className: 'font-semibold',
		icon: '🚀',
		iconTheme: {
			primary: '#000',
			secondary: '#fff',
		},
		// Aria
	})
}
