import { useRouter } from 'next/router'

import ProjectCard from './ProjectCard'
import ProjectDetailModal from './ProjectDetailModal'
import projects from '@/data/projects'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetaData'
import { FiArrowRightCircle, FiChevronsRight } from 'react-icons/fi'
import { BiChevronRight } from 'react-icons/bi'

function FeaturedProjects() {
	const router = useRouter()
	return (
		<div>
			{router.query.project && (
				<ProjectDetailModal
					project={projects[router.query.project - 1]}
					onClose={() => {
						router.push('/')
					}}
				/>
			)}
			<h1 className='font-black text-3xl'>Featured Projects</h1>
			<div className='mt-10'>
				{projects.map((project) => (
					<ProjectCard project={project} key={project.id} />
				))}
			</div>
			<Link href={siteMetadata.github}>
				<div className='flex items-center space-x-2 text-gray-400 hover:text-sky-500 transition-colors duration-300'>
					<p className='text-right '>Checkout more projects</p>
					<FiArrowRightCircle />
				</div>
			</Link>
		</div>
	)
}

export default FeaturedProjects
