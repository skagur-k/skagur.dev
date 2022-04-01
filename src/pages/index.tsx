import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>skagur.dev</title>
        <meta
          name="description"
          content="A Minimal portfolio site developed witn Next.JS and TypeScript"
        />
        <meta name="author" content="skagur-k" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
