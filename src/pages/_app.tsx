import { ThemeProvider } from 'next-themes'
import Layout from '@/components/MainLayout'
import MaintenancePage from './maintenance'

import '@/styles/globals.css'
import '@/styles/prism.css'
import '@code-hike/mdx/dist/index.css'

function App({ Component, pageProps }: any) {
	// Shows maintenance page if the env var NEXT_PUBLIC_MAINTENANCE is set to true.
	if (process.env.NEXT_PUBLIC_MAINTENANCE === 'true') {
		console.log('🚧 Website Under Constructon 🚧')
		return <MaintenancePage />
	}

	return (
		<ThemeProvider
			defaultTheme='light'
			attribute='class'
			className='h-full'>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	)
}

export default App
