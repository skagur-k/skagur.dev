import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { BiMenuAltRight } from 'react-icons/bi'
import { FiMenu } from 'react-icons/fi'
import { SiGithub } from 'react-icons/si'
import Link from './Link'
import headerNavLinks from '@/lib/headerNavLinks'
import siteMetadata from '@/data/siteMetaData'
import { useRouter } from 'next/router'

export default function HamburgerMenu() {
	const router = useRouter()
	return (
		<div className='z-40'>
			<Menu as='div' className='relative inline-block'>
				<div>
					<Menu.Button className='inline-flex w-full p-1 justify-center rounded-md hover:ring-2 ring-gray-200 dark:ring-gray-500 hover:text-sky-600 dark:hover:text-sky-500 transition-all'>
						<FiMenu className='h-8 w-8 ' aria-hidden='true' />
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter='transition ease-out duration-100'
					enterFrom='transform opacity-0 scale-95'
					enterTo='transform opacity-100 scale-100'
					leave='transition ease-in duration-75'
					leaveFrom='transform opacity-100 scale-100'
					leaveTo='transform opacity-0 scale-95'>
					<Menu.Items className='absolute right-0 mt-4 p-2 w-50 origin-top-right divide-y font-semibold divide-gray-200 rounded-md bg-gray-100 shadow-lg ring-1 ring-white ring-opacity-5 '>
						<div className='px-1 py-2 '>
							{headerNavLinks.map((link) => (
								<Menu.Item key={link.title}>
									{({ active }) => (
										<button
											onClick={() => router.push(link.href)}
											className={`${
												active ? 'bg-sky-500 text-white' : 'text-gray-900'
											} group flex w-full items-center rounded-md px-2 py-3`}>
											<div className='flex items-center'>
												<span className='ml-3 font-medium'>
													{link.fullTitle}
												</span>
											</div>
										</button>
									)}
								</Menu.Item>
							))}
						</div>
						<div className='px-1 py-3'>
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={() => router.push('/')}
										className={`${
											active ? 'bg-gray-500 text-white' : 'text-gray-900'
										} group flex w-full items-center rounded-md px-2 py-3 text-base`}>
										<div className='flex items-center'>
											<SiGithub className='w-6 h-6' />
											<span className='ml-3 font-medium'>GitHub</span>
										</div>
									</button>
								)}
							</Menu.Item>
						</div>
						<div className='px-1 py-3'>
							<Menu.Item>
								<Link href='/'>
									<div className='flex justify-center w-full items-center rounded-md px-2 py-2 text-right text-gray-900'>
										<span className='text-amber-500'>&lt;&nbsp;&nbsp;</span>
										skagur.dev
										<span className='text-amber-500'>&nbsp;/&nbsp;&gt;</span>
									</div>
								</Link>
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	)
}
