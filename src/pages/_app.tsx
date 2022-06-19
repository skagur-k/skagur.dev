import { ThemeProvider } from 'next-themes'
import { AnimatePresence } from 'framer-motion'
import MainLayout from '@/components/Layout'
import MotionLayout from '@/components/Layout/MotionLayout'
import DefaultSEO from '@/components/DefaultSEO'
import MaintenancePage from './maintenance'
import '@/styles/globals.css'
import '@/styles/prism.css'

function App({ Component, pageProps, router }: any) {
	const url = `https://skagur.dev${router.route}`

	// Shows maintenance page if the env var NEXT_PUBLIC_MAINTENANCE is set to true.
	if (process.env.NEXT_PUBLIC_MAINTENANCE === 'true') {
		return (
			<>
				<DefaultSEO />
				<ThemeProvider
					defaultTheme='dark'
					attribute='class'
					enableSystem={false}>
					<MaintenancePage />
				</ThemeProvider>
			</>
		)
	}

	return (
		<>
			<DefaultSEO />
			<ThemeProvider
				defaultTheme='dark'
				attribute='class'
				enableSystem={false}
				enableColorScheme={true}>
				<MainLayout>
					<AnimatePresence
						exitBeforeEnter
						initial={false}
						onExitComplete={() => window.scrollTo(0, 0)}>
						<MotionLayout key={url}>
							<Component {...pageProps} key={router.route} />
						</MotionLayout>
					</AnimatePresence>
				</MainLayout>
			</ThemeProvider>
		</>
	)
}

export default App
