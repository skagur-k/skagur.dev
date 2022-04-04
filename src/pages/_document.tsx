import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
    render() {
        return (
            <Html>
                <Head />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;400;600;700&display=swap"
                    rel="stylesheet"
                />
                <title>[skagur.dev]</title>
                <meta
                    name="description"
                    content="A Minimal portfolio site developed witn Next.JS and TypeScript"
                />
                <meta name="author" content="skagur-k" />
                <link rel="icon" href="/favicon.ico" />
                <body className="bg-white text-black dark:bg-zinc-900 dark:text-white antialiased">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}