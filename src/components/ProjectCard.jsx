import ReactTooltip from 'react-tooltip'

function ProjectCard({ project }) {
	return (
		<div className='group flex ring-1 hover:ring-sky-500 dark:hover:ring-sky-500 ring-gray-200 dark:ring-gray-800 p-4 rounded-2xl my-4'>
			<div className='text-sky-500 ml-2 mr-14 text-lg font-bold'>
				{project.id}
			</div>
			<div className='flex flex-col flex-1 space-y-4'>
				<div className='flex justify-between items-center'>
					<div className='group-hover:text-sky-500 underline-offset-4 font-bold text-lg'>
						{project.name}
					</div>
					<div className='flex space-x-3'>
						{project.stacks.map((stack, id) => {
							return (
								<div key={id}>
									<span>{stack.icon}</span>
									<ReactTooltip effect='solid' />
								</div>
							)
						})}
					</div>
				</div>
				<div className='text-gray-300 dark:text-gray-500'>
					{project.description}
				</div>
			</div>
		</div>
	)
}

export default ProjectCard
