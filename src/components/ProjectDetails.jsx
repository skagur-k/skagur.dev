import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { SiGithub } from 'react-icons/si'
import Link from '@/components/Link'
import { FaLink } from 'react-icons/fa'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { FiChevronLeft } from 'react-icons/fi'

export default function ProjectDetails({ project, onClose = () => {} }) {
	let [isOpen, setIsOpen] = useState(true)
	let imgSrc

	function closeModal() {
		setIsOpen(false)
	}

	const { resolvedTheme } = useTheme()

	switch (resolvedTheme) {
		case 'dark':
			imgSrc = project.coverimagedark
			break
		default:
			imgSrc = project.coverimage
			break
	}

	return (
		<>
			<Transition appear static show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-50' onClose={closeModal}>
					<div className='fixed inset-0 overflow-y-auto'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='ease-in duration-100'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'>
							<div className='fixed inset-0 bg-black bg-opacity-25' />
						</Transition.Child>

						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-90'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-100'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
								afterLeave={onClose}>
								<Dialog.Panel className='w-full max-w-3xl transform overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 p-4 text-left align-middle shadow-xl transition-all'>
									<button
										onClick={closeModal}
										className='flex items-center justify-center px-1 py-2 font-semibold rounded-lg text-gray-600 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-500'>
										<FiChevronLeft className='text-2xl' />
										<p>Back</p>
									</button>
									<div className='p-4 sm:p-8 space-y-8'>
										{project.coverimage && (
											<Image src={imgSrc} alt='project image' />
										)}
										<div className='flex flex-col space-y-4'>
											<div className='flex justify-between items-center'>
												<div className='flex flex-col flex-1 p-0 space-y-1'>
													<div className='flex flex-col sm:flex-row justify-between items-center'>
														<Dialog.Title className='font-black text-xl sm:text-3xl'>
															{project.name}
														</Dialog.Title>
														<p className='text-sm font-semibold text-gray-400'>
															{project.period}
														</p>
													</div>
												</div>
											</div>

											{project.description}
										</div>
										<div className='flex flex-col space-y-2'>
											<h3 className='font-bold text-lg'>Tech Stack</h3>
											<div className='grid grid-cols-2 gap-x-4 gap-y-2'>
												{project.stacks.map((stack, id) => {
													return (
														<Link
															key={id}
															href={stack.url}
															className={`${
																stack.url ? 'cursor-pointer' : 'cursor-default'
															}`}>
															<div
																className={`flex space-x-2 items-centerdark:text-gray-200 dark:hover:text-sky-500 hover:text-sky-500 hover:ring-2 rounded-xl px-4 py-2 ring-sky-500`}>
																<span>{stack.icon}</span>
																<span>{stack.name}</span>
															</div>
														</Link>
													)
												})}
											</div>
										</div>
									</div>

									<div className='flex justify-center mt-4 space-x-4'>
										{project.projectUrl && (
											<Link href={project.projectUrl}>
												<button
													type='button'
													className='flex items-center space-x-2 justify-center rounded-md bg-gray-700 dark:bg-gray-600 px-4 py-2 text-base font-semibold text-gray-200 hover:bg-sky-500 dark:hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2'>
													<FaLink className='w-4 h-4' />
													<p>Website</p>
												</button>
											</Link>
										)}

										{project.githubRepo && (
											<Link href={project.githubRepo}>
												<button
													type='button'
													className='flex items-center space-x-2 justify-center rounded-md bg-gray-700 dark:bg-gray-600 px-4 py-2 text-base font-semibold text-gray-200 hover:bg-sky-500 dark:hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2'>
													<SiGithub className='w-5 h-5' />
													<p>GitHub</p>
												</button>
											</Link>
										)}
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
