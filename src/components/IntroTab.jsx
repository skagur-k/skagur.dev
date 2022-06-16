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
							'ring-white ring-opacity-10 space-y-4 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-1'
						)}>
						<h2>
							Hi, I am <span className='font-bold'>Nam Hyuck Kim</span>
						</h2>
						<p>
							skagur.dev is my humble garden🌳 where I showcase myself and share
							my experiences as a developer. Feel free to contact me if you have
							any questions 😎.
						</p>
						<ul className='mt-6 space-y-4'>
							<li>
								🏫 I have a Bachelor&apos;s Degree in Information Technology
								from HKPU.
							</li>
							<li>
								🚀 Recently, I&apos;ve been exploring{' '}
								<span className='font-semibold text-green-500'>
									Spring Boot
								</span>{' '}
								Back-end Programming
							</li>
							<li>🎈 I like trying new things. </li>
							<li>🏃‍♂️ I excercise to keep my body and mind healthy. </li>
						</ul>
					</Tab.Panel>
					<Tab.Panel
						className={classNames(
							'rounded-xl p-4',
							'ring-white ring-opacity-10 space-y-4 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-1'
						)}>
						<h2>
							안녕하세요. 이것저것 배우고 만들어보는 것을 좋아하는 사람,{' '}
							<span className='font-black'>김남혁</span>
							입니다.
						</h2>
						<p>
							이 곳은 저를 소개하는 동시에, 제가 개발자로 성장하는 과정을
							기록하기 위해 구축한 포트폴리오/블로그 사이트입니다. 문의사항은
							아래 연락처로 부탁드립니다 😊.
						</p>
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
