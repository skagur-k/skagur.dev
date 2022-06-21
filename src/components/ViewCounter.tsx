import { Views } from '@/lib/types'
import fetcher from '@/lib/utils/fetcher'
import { useEffect } from 'react'
import useSWR from 'swr'

export default function ViewCounter({ slug }: { slug: string }) {
	const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher)
	const views = data?.total

	useEffect(() => {
		if (
			!process.env.VERCEL_ENV ||
			process.env.VERCEL_ENV === 'development'
		) {
		} else {
			const view = () => {
				fetch(`/api/views/${slug}`, {
					method: 'POST',
				})
			}

			view()
		}
	}, [slug])

	return <>{views ? views.toString() : <span>Loading</span>}</>
}
