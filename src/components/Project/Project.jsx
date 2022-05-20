import Image from 'next/image'
import hero from '@/public/static/images/hero.webp'
import Link from '@/components/Link'
import styles from './Project.module.css'

const Project = ({ frontmatter }) => {
	const { title, description, publishedAt, slug, stack } = frontmatter
	return (
		<Link href={`/project/${slug}`}>
			<div className={styles.cardwrapper}>
				<div className='bg-[url(../../public/static/images/hero.webp)] bg-cover transition-transform'>
					<div className={styles.cardcontent}>
						<div className='flex justify-between mt-40'>
							<h1 className={styles.cardtitle}>{title}</h1>
							<h1 className='font-semibold mt-1 text-xs text-gray-500'>
								{publishedAt}
							</h1>
						</div>
						<div className={styles.carddetail}>
							<p className='mt-4 h-20 overflow-hidden'>
								{description}
							</p>
							<div className='flex items-center mt-2 font-semibold'>
								<span className='font-bold text-sm mr-3 my-3'>
									Stack:
								</span>
								{stack}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default Project
