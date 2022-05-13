import Image from 'next/image'
import hero from '@/public/static/images/hero.webp'
import Link from '@/components/Link'

const Project = ({ children }) => {
	return (
		<div className='p-6 ring-2 ring-gray-500 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-800'>
			<div className='w-full'>
				<Image
					alt='alt'
					src={hero}
					objectFit='cover'
					layout='responsive'
				/>
			</div>
			<div className='flex-col mt-4'>
				<div className='flex justify-between'>
					<h1 className='font-bold text-lg'>Project Title</h1>
					<h1 className='font-semibold mt-1 text-sm text-gray-500'>
						2021.12.10
					</h1>
				</div>
				<p className='mt-4'>
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the standard
					dummy text ever since the 1500s, when an unknown printer
					took a galley of type and scrambled it to make a type
					specimen book. It has survived not only five centuries.
				</p>
				<div className='flex items-center mt-4 font-semibold'>
					<span className='font-bold text-lg mr-3 my-3'>Stacks:</span>
					React JS, Next JS, Node JS, Java
				</div>
				<Link href='/about'>
					<div className='flex justify-center border-2 py-2'>
						Click for Details
					</div>
				</Link>
			</div>
		</div>
	)
}

export default Project
