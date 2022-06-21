import { Views } from '@/lib/types'
import fetcher from '@/lib/utils/fetcher'
import { useEffect } from 'react'
import useSWR from 'swr'

export default function ViewCounter({ slug }: { slug: string }) {
	const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher)
	const views = data?.total
	console.log(process.env.NEXT_PUBLIC_VERCEL_ENV)
	useEffect(() => {
		if (
			!process.env.NEXT_PUBLIC_VERCEL_ENV ||
			process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
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
