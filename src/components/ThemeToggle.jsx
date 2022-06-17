import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { HiMoon, HiSun } from 'react-icons/hi'
import { motion } from 'framer-motion'

const Switch = () => {
	const { systemTheme, theme, setTheme } = useTheme()
	const currentTheme = theme === 'system' ? systemTheme : theme
	const [mounted, setMounted] = useState(false)

	useEffect(() => setMounted(true), [])
	if (!mounted) return null

	return (
		<button
			aria-label='Toggle Dark Mode'
			type='button'
			className='btn rounded px-2 items-center hover:text-amber-500 dark:hover:text-amber-500 hover:ring-2 ring-gray-200 dark:ring-gray-500 transition-all'
			onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}>
			{currentTheme === 'dark' ? (
				<HiSun className='h-7 w-7' />
			) : (
				<HiMoon className='h-7 w-7' />
			)}
		</button>
	)
}

export default Switch
