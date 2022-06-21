import { PrismaClient } from '@prisma/client'

declare global {
	var prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (
	process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ||
	process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
) {
	prisma = new PrismaClient()
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient()
	}

	prisma = global.prisma
}

export default prisma
