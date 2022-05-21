import { useState } from 'react'
import { Tab } from '@headlessui/react'
import ContactModal from './ContactModal'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function IntroTab() {
	return (
		<div className='w-full py-2 shadow-sm relative'>
			<Tab.Group>
				<Tab.List className='flex space-x-1 rounded-xl dark:bg-slate-500/40 bg-slate-900/20 p-1'>
					<Tab
						className={({ selected }) =>
							classNames(
								'w-full rounded-lg py-2.5 text-sm font-semibold leading-5 ',
								'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
								selected
									? 'bg-white shadow text-gray-800'
									: 'text-gray-500 hover:bg-white/[0.12] hover:text-white'
							)
						}>
						ENG
					</Tab>
					<Tab
						className={({ selected }) =>
							classNames(
								'w-full rounded-lg py-2.5 text-sm font-semibold leading-5 ',
								'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
								selected
									? 'bg-white shadow text-gray-800'
									: 'text-gray-500 hover:bg-white/[0.12] hover:text-white'
							)
						}>
						KOR
					</Tab>
				</Tab.List>
				<Tab.Panels className='mt-2'>
					<Tab.Panel
						className={classNames(
							'rounded-xl p-4',
							'ring-white ring-opacity-10 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-1'
						)}>
						<h2>
							Hi, I am{' '}
							<span className='font-black'>Nam Hyuck Kim</span> 😁
						</h2>
						<ul className='mt-6 space-y-4'>
							<li>
								🏫 I have a Bachelor&apos;s Degree in
								Information Technology from Hong Kong
								Polytechnic University in 2019
							</li>
							<li>
								🚀 Recently, I&apos;ve been exploring{' '}
								<span className='font-semibold text-green-500'>
									Spring Boot
								</span>{' '}
								Back-end Programming
							</li>
							<li>🎈 I like trying new things. </li>
							<li>
								🏃‍♂️ I excercise to keep my body and mind healthy.{' '}
							</li>
						</ul>
					</Tab.Panel>
					<Tab.Panel
						className={classNames(
							'rounded-xl p-4',
							'ring-white ring-opacity-10 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-1'
						)}>
						<h2>
							안녕하세요. 이것저것 배우고 만들어보는 것을 좋아하는
							사람, <span className='font-black'>김남혁</span>
							입니다.
						</h2>
						<ul className='mt-6 space-y-4'>
							<li>
								🏫 홍콩이공대학교 졸업 - BSc
								<sub>&#40;Hons&#41;</sub> Information Technology
							</li>
							<li>
								🚀 최근에는{' '}
								<span className='font-semibold text-green-500'>
									Spring Boot
								</span>{' '}
								백엔드 프로그래밍 공부를 하고 있습니다.
							</li>
							<li>🎈 새로운 것에 도전하는걸 좋아합니다. </li>
							<li>🏃‍♂️ 활동적인 것을 좋아합니다. </li>
						</ul>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
			<ContactModal className='flex mt-4 md:absolute right-3 bottom-5' />
		</div>
	)
}
