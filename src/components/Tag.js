import Link from '@/components/Link'

const Tag = ({ text }) => {
	return (
		<Link
			href={`/tags/}`}
			className='mr-3 text-xs font-medium uppercase px-2 py-1 rounded-2xl border-[1px] border-amber-500 hover:border-amber-700 dark:hover:border-gray-300'>
			{text.split(' ').join('-')}
		</Link>
	)
}

export default Tag
