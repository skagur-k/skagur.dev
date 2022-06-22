import { ThemeProvider } from 'next-themes'
import { AnimatePresence } from 'framer-motion'
import MainLayout from '@/components/Layout'
import MotionLayout from '@/components/Layout/MotionLayout'
import DefaultSEO from '@/components/DefaultSEO'
import '@/styles/globals.css'
import '@/styles/prism.css'
import { NextWebVitalsMetric } from 'next/app'

function App({ Component, pageProps, router }: any) {
	const url = `https://skagur.dev${router.route}`

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

export function reportWebVitals(metric: NextWebVitalsMetric) {
	console.log(metric)
}

export default App
