import prisma from '@/lib/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const slug = req.query.slug.toString()

		if (req.method === 'POST') {
			const upsertViews = await prisma.viewcounter.upsert({
				where: { slug },
				create: { slug },
				update: { views: { increment: 1 } },
			})

			return res.status(200).json({
				total: upsertViews.views.toString(),
			})
		}

		if (req.method === 'GET') {
			const viewcounter = await prisma.viewcounter.findUnique({
				where: { slug },
			})

			return res.status(200).json({
				total: viewcounter ? viewcounter.views.toString() : '0',
			})
		}
	} catch (e: any) {
		return res.status(500).json({ message: e.message })
	}
}
