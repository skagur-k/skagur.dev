import { FcCalendar, FcOpenedFolder, FcAlarmClock } from 'react-icons/fc'
import { format, parseISO } from 'date-fns'

const PostInfo = ({ author, publishedAt, readingTime }) => {
	return (
		<div className='flex justify-between items-center px-0 mb-4'>
			<p className='font-semibold text-sm bg-sky-200 text-sky-800 px-2'>
				{author}
			</p>
			<div className='flex justify-center space-x-6 text-gray-400 text-sm md:text-sm'>
				<div className='flex items-center space-x-2 justify-center'>
					<FcOpenedFolder className='w-4 h-4' />
					<p>Blog</p>
				</div>
				<div className='flex items-center space-x-2 justify-center'>
					<FcCalendar className='w-4 h-4' />
					<p>{format(parseISO(publishedAt), 'dd LLLL, yyyy')}</p>
				</div>
				<div className='flex items-center space-x-2 justify-center'>
					<FcAlarmClock className='w-4 h-4' />
					<p>{readingTime.text}</p>
				</div>
			</div>
		</div>
	)
}

export default PostInfo
