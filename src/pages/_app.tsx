import { ThemeProvider } from 'next-themes'
import Layout from '@/components/MainLayout'
import MaintenancePage from './maintenance'
import { AnimatePresence } from 'framer-motion'

import '@/styles/globals.css'
import '@/styles/prism.css'
import '@code-hike/mdx/dist/index.css'
import MotionLayout from '@/components/Layouts/MotionLayout'

function App({ Component, pageProps, router }: any) {
	// Shows maintenance page if the env var NEXT_PUBLIC_MAINTENANCE is set to true.
	const url = `https://skagur.dev${router.route}`

	if (process.env.NEXT_PUBLIC_MAINTENANCE === 'true') {
		console.log('🚧 Website Under Constructon 🚧')
		return <MaintenancePage />
	}

	return (
		<ThemeProvider defaultTheme='dark' attribute='class'>
			<Layout>
				<AnimatePresence
					exitBeforeEnter
					initial={false}
					onExitComplete={() => window.scrollTo(0, 0)}>
					<MotionLayout key={router.route}>
						<Component {...pageProps} key={router.route} />
					</MotionLayout>
				</AnimatePresence>
			</Layout>
		</ThemeProvider>
	)
}

export default App
