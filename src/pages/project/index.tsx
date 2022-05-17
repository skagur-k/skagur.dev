import { allProjects } from 'contentlayer/generated'
import Project from '@/components/Project'
import { compareDesc, parseISO } from 'date-fns'
import { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'

const ProjectsPage = ({
	projectList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<>
			<NextSeo title='Projects' />

			<div className='flex justify-between space-x-4 mb-12 leading-10'>
				<h1 className='text-3xl font-extrabold text-gray-900 dark:text-gray-100'>
					Projects
				</h1>
				<h2 className='text-gray-400 dark:text-gray-400 font-base'>
					<span className='underline decoration-wavy decoration-amber-500 underline-offset-4'>
						Things
					</span>{' '}
					I worked on.
				</h2>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-20 mt-12'>
				{projectList.map((frontmatter) => {
					return (
						<li key={frontmatter.slug}>
							<Project frontmatter={frontmatter}></Project>
						</li>
					)
				})}
			</div>
		</>
	)
}

export async function getStaticProps() {
	const projectList = allProjects.sort((a, b) => {
		const date_a = parseISO(a.publishedAt)
		const date_b = parseISO(b.publishedAt)
		return compareDesc(date_a, date_b)
	})

	return {
		props: {
			projectList,
		},
	}
}

export default ProjectsPage
