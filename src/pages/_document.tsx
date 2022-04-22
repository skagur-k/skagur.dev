import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
	render() {
		return (
			<Html>
				<Head />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='true'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;400;500;600;700;800&display=swap'
					rel='stylesheet'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;200;400;500;600;700;800&display=swap'
					rel='stylesheet'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap'
					rel='stylesheet'
				/>
				<link rel='icon' href='/favicon.ico' />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
