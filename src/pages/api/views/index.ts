import prisma from '@/lib/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const totalViews = await prisma.viewcounter.aggregate({
			_sum: {
				views: true,
			},
		})

		return res.status(200).json({
			total: totalViews?._sum?.views?.toString(),
		})
	} catch (e: any) {
		return res.status(500).json({ message: e.message })
	}
}
