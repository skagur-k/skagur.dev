import { useRouter } from 'next/router'

import ProjectCard from './ProjectCard'
import ProjectDetails from './ProjectDetails'
import projects from '@/components/Projects'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetaData'
import { FiArrowRightCircle } from 'react-icons/fi'

function FeaturedProjects() {
	const router = useRouter()
	return (
		<div>
			{router.query.project && (
				<ProjectDetails
					project={projects[router.query.project - 1]}
					onClose={() => {
						router.push('/')
					}}
				/>
			)}
			<h1 className='font-black text-3xl'>Featured Projects</h1>
			<div className='mt-4'>
				{projects.map((project) => (
					<ProjectCard project={project} key={project.id} />
				))}
			</div>
			<Link href={siteMetadata.github}>
				<div className='flex flex-1 items-center justify-end font-semibold space-x-2 text-gray-400 hover:text-sky-500'>
					<p>Check out more projects</p>
					<FiArrowRightCircle className='text-xl' />
				</div>
			</Link>
		</div>
	)
}

export default FeaturedProjects
