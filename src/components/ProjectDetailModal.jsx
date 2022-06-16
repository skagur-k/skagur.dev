import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'

export default function ProjectDetailModal({ project, onClose = () => {} }) {
	const router = useRouter()

	let [isOpen, setIsOpen] = useState(true)

	return (
		<>
			<Transition appear static show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={onClose}>
					<div className='fixed inset-0 overflow-y-auto'>
						{/* Backdrop */}
						<div className='fixed inset-0 bg-black bg-opacity-25' />

						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-90'
								enterTo='opacity-100 scale-100'>
								<Dialog.Panel className='w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gray-800 p-4 text-left align-middle shadow-xl transition-all'>
									<div className='p-4 space-y-8'>
										{/* Cover Image */}
										<h1 className='text-center ring-4 w-full h-60'>
											Image Goes Here
										</h1>
										<div className='flex flex-col flex-1 space-y-4'>
											<div className='flex justify-between items-center'>
												<div className='font-bold text-2xl transition-colors duration-200'>
													<Dialog.Title>{project.name}</Dialog.Title>
												</div>
											</div>
											<div className='text-gray-300 dark:text-gray-500'>
												<Dialog.Description>
													{project.description}
												</Dialog.Description>
											</div>
										</div>
										<div className='flex flex-col space-y-2'>
											<h3 className='font-bold text-lg'>Tech Stack</h3>
											<div className='flex space-x-4'>
												{project.stacks.map((stack, id) => {
													return (
														<div
															key={id}
															className='flex space-x-2 items-center text-gray-400'>
															<span>{stack.icon}</span>
															<span>{stack.name}</span>
														</div>
													)
												})}
											</div>
										</div>
									</div>

									<div className='mt-4'>
										<button
											type='button'
											className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
											onClick={onClose}>
											Got it, thanks!
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
