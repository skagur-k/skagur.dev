import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>[skagur.dev]</title>
                <meta
                    name="description"
                    content="A Minimal portfolio site developed witn Next.JS and TypeScript"
                />
                <meta name="author" content="skagur-k" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container flex"></div>
        </div>
    );
};

export default Home;
